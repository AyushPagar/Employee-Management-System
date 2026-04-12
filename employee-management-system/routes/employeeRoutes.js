const express = require('express');
const router = express.Router();
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getMyProfile
} = require('../controllers/employeeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/profile/me', protect, getMyProfile);
router.route('/')
    .get(protect, adminOnly, getEmployees)
    .post(protect, adminOnly, createEmployee);
router.route('/:id')
    .get(protect, getEmployee)
    .put(protect, adminOnly, updateEmployee)
    .delete(protect, adminOnly, deleteEmployee);

module.exports = router;
