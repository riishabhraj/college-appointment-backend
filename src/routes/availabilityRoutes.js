const express = require('express');
const { addAvailability, getAvailability } = require('../controllers/availabilityController');
const authenticate = require('../middleware/authenticate');
const authorizeProfessor = require('../middleware/authorizeProfessor');

const router = express.Router();

router.post('/', authenticate, authorizeProfessor, addAvailability);
router.get('/:professorId', authenticate, getAvailability);

module.exports = router;
