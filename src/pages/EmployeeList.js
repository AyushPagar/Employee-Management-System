import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await API.get('/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await API.delete(`/employees/${id}`);
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <Link to="/add-employee" className="btn">Add New Employee</Link>
            
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.user?.name}</td>
                            <td>{employee.user?.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>
                                <Link to={`/employee/${employee._id}`} className="btn-small">View</Link>
                                <button 
                                    onClick={() => handleDelete(employee._id)} 
                                    className="btn-small btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
