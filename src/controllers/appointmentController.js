const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

exports.bookAppointment = async (req, res) => {
    const { professorId, startTime } = req.body;
    const studentId = req.user.id;

    try {
        const availability = await Availability.findOne({ professorId, startTime });

        if (!availability) {
            return res.status(400).json({ message: 'Slot not available' });
        }

        const appointment = await Appointment.create({ professorId, studentId, startTime });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    const userId = req.user.id;

    try {
        const appointments = await Appointment.find({ studentId: userId });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
