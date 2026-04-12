import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Employee Management</Link>
            </div>
            <div className="nav-links">
                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        {user.role === 'admin' && (
                            <>
                                <Link to="/employees">Employees</Link>
                                <Link to="/add-employee">Add Employee</Link>
                            </>
                        )}
                        {user.role === 'employee' && (
                            <Link to="/my-profile">My Profile</Link>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
