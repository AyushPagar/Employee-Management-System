import { useState, useEffect } from 'react';
import API from '../services/api';

const EmployeeProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/employees/profile/me');
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!profile) return <div>Profile not found</div>;

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-card">
                <div className="profile-item">
                    <strong>Name:</strong> {profile.user?.name}
                </div>
                <div className="profile-item">
                    <strong>Email:</strong> {profile.user?.email}
                </div>
                <div className="profile-item">
                    <strong>Employee ID:</strong> {profile.employeeId}
                </div>
                <div className="profile-item">
                    <strong>Department:</strong> {profile.department}
                </div>
                <div className="profile-item">
                    <strong>Position:</strong> {profile.position}
                </div>
                <div className="profile-item">
                    <strong>Phone:</strong> {profile.phone || 'N/A'}
                </div>
                <div className="profile-item">
                    <strong>Address:</strong> {profile.address || 'N/A'}
                </div>
                <div className="profile-item">
                    <strong>Date of Joining:</strong> {new Date(profile.dateOfJoining).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
