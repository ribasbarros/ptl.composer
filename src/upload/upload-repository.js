const mongoose = require('mongoose');
const Upload = mongoose.model('Upload');

exports.create = async(data) => {
    var upload = new Upload(data);
    await upload.save();
}

exports.getById = async(id) => {
    const res = await Upload.findById(id);
    return res;
}

exports.update = async(id, data) => {
    await Upload
        .findByIdAndUpdate(id, {
            $set: {
                status: data.status,
                updateDate: data.updateDate,
                updateBy: data.updateBy
            }
        });
}