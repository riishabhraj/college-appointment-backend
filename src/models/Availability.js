const mongoose = require('../config/database');
const { Schema } = mongoose;

const availabilitySchema = new Schema({
    professorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
