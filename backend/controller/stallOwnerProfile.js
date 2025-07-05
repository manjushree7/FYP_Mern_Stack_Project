import StallOwnerProfile from '../models/stallOwnerProfile.model.js';

// Create or update StallOwnerProfile
export const upsertStallOwnerProfile = async (req, res) => {
    const userId = req.user.id;
    const { stallName, location, contactNumber } = req.body;

    if (!stallName || !location) {
        return res.status(400).json({ message: 'stallName and location are required' });
    }

    try {
        let profile = await StallOwnerProfile.findOne({ user: userId });

        if (profile) {
            profile.stallName = stallName;
            profile.location = location;
            profile.contactNumber = contactNumber;
            await profile.save();
        } else {
            profile = new StallOwnerProfile({ user: userId, stallName, location, contactNumber });
            await profile.save();
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save stall owner profile', error: error.message });
    }
};

// Get StallOwnerProfile of logged in user
export const getStallOwnerProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const profile = await StallOwnerProfile.findOne({ user: userId })
            .populate('foodItems eventsParticipating');
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get profile', error: error.message });
    }
};
