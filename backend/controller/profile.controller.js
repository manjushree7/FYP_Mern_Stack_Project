import StallOwnerProfile from '../models/stallOwnerProfile.model.js';
import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role.toLowerCase();

    try {
        if (role === 'stallowner') {
            const profile = await StallOwnerProfile.findOne({ user: userId })
                .populate('foodItems eventsParticipating');
            if (!profile) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json(profile);
        } else if (role === 'customer') {
            const user = await User.findById(userId).select('name email location profileImage');
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get profile', error: error.message });
    }
};

export const upsertProfile = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role.toLowerCase();
    const { stallName, location, contactNumber, profileImage, name } = req.body;

    try {
        if (role === 'stallowner') {
            if (!stallName || !location) {
                return res.status(400).json({ message: 'stallName and location are required' });
            }

            let profile = await StallOwnerProfile.findOne({ user: userId });
            if (profile) {
                profile.stallName = stallName;
                profile.location = location;
                profile.contactNumber = contactNumber;
                profile.profileImage = profileImage || profile.profileImage;
                await profile.save();
            } else {
                profile = new StallOwnerProfile({
                    user: userId,
                    stallName,
                    location,
                    contactNumber,
                    profileImage,
                });
                await profile.save();
            }
            return res.status(200).json(profile);

        } else if (role === 'customer') {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            if (name !== undefined) user.name = name;
            if (location !== undefined) user.location = location;
            if (profileImage !== undefined) user.profileImage = profileImage;

            await user.save();
            return res.status(200).json(user);

        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to save profile', error: error.message });
    }
};
