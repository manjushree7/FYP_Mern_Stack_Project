import Cart from '../models/cart.model.js';

export const getCart = async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');
    res.json(cart || { user: userId, items: [] });
};

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { foodItemId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [{ foodItem: foodItemId, quantity }] });
    } else {
        const itemIndex = cart.items.findIndex(i => i.foodItem.toString() === foodItemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ foodItem: foodItemId, quantity });
        }
    }

    await cart.save();
    res.status(200).json(cart);
};

export const updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;
    console.log('Update cart item route hit', req.body, req.user);

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.id(itemId); // 🟢 Use Mongoose subdocument accessor
        if (item) {
            item.quantity = quantity;
            await cart.save();

            const updatedCart = await Cart.findOne({ user: userId }).populate('items.foodItem'); // Refresh with populate
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update cart item', error: error.message });
    }
};


export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.itemId;

    const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
    ).populate('items.foodItem');

    res.json(cart);
};

export const clearCart = async (req, res) => {
    const userId = req.user.id;
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    res.json({ message: 'Cart cleared' });
};
