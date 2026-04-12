import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EmployeeProfile from './pages/EmployeeProfile';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <main className="container">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/employees" element={
                                <PrivateRoute adminOnly>
                                    <EmployeeList />
                                </PrivateRoute>
                            } />
                            <Route path="/add-employee" element={
                                <PrivateRoute adminOnly>
                                    <AddEmployee />
                                </PrivateRoute>
                            } />
                            <Route path="/my-profile" element={
                                <PrivateRoute>
                                    <EmployeeProfile />
                                </PrivateRoute>
                            } />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}


export default App;
