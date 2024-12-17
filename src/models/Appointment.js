const mongoose = require('../config/database'); 
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    professorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
