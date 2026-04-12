const Employee = require('../models/Employee');
const User = require('../models/User');

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('user', 'name email');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('user', 'name email');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { name, email, password, employeeId, department, position, phone, address, salary } = req.body;
        const user = await User.create({ name, email, password, role: 'employee' });
        const employee = await Employee.create({
            user: user.id,
            employeeId,
            department,
            position,
            phone,
            address,
            salary
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        await User.findByIdAndDelete(employee.user);
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user.id }).populate('user', 'name email');
        if (!employee) return res.status(404).json({ message: 'Profile not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getMyProfile };