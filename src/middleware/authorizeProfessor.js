const authorizeProfessor = (req, res, next) => {
    if (req.user.role !== 'professor') {
        return res.status(403).json({ message: 'Access denied. Professors only.' });
    }
    next();
};

module.exports = authorizeProfessor;
