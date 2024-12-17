const Availability = require('../models/Availability');

exports.addAvailability = async (req, res) => {
    const { startTime, endTime } = req.body;
    const professorId = req.user.id;

    try {
        const availability = await Availability.create({ professorId, startTime, endTime });
        res.status(201).json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAvailability = async (req, res) => {
    const { professorId } = req.params;

    try {
        const availability = await Availability.find({ professorId });
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
