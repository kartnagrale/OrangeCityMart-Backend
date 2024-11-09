const Category = require('../models/category.model');

exports.getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const total = await Category.countDocuments();
        const categories = await Category.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            categories,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};