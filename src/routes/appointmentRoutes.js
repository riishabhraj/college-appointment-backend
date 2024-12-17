const express = require('express');
const { bookAppointment, cancelAppointment, getAppointments } = require('../controllers/appointmentController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, bookAppointment);
router.delete('/:id', authenticate, cancelAppointment);
router.get('/', authenticate, getAppointments);

module.exports = router;
