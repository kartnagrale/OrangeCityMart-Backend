const userModel = require('../models/user.model');

const isModerator = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user || (user.role !== 'moderator' && user.role !== 'admin')) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = isModerator;