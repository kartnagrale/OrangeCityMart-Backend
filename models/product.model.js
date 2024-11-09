const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true 
    },
    price: { type: Number, required: true, min: 0 },
    negotiable: { type: Boolean, default: false },
    condition: { 
        type: String, 
        enum: ['New', 'Like New', 'Used - Good', 'Used - Fair'], 
        required: true 
    },
    images: [{
        type: String,
    }],
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number], // [longitude, latitude]
        address: String,
        city: String,
        state: String
    },
    status: { 
        type: String, 
        enum: ['active', 'sold', 'inactive'], 
        default: 'active' 
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });


// Export the Product model
module.exports = mongoose.model('Product', productSchema);
