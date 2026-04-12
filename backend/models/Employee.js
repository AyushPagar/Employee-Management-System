const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    dateOfJoining: { type: Date, default: Date.now },
    salary: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);