const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    url: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['uploaded', 'approved', 'rejected'],
        default: 'uploaded'
    }
});

module.exports = mongoose.model('Upload', schema);