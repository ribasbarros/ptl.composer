const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    url: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    updateBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    status: {
        type: String,
        required: true,
        enum: ['uploaded', 'approved', 'rejected'],
        default: 'uploaded'
    }
});

module.exports = mongoose.model('Upload', schema);