import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import authApi from '@/api/auth';

interface PrivateRouteUserProps {
    component: React.ComponentType;
    role: string;
}

const PrivateRouteUser: React.FC<PrivateRouteUserProps> = ({ component: Component, role }) => {
    const [isRole, setIsRole] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authApi.getUser();
                if (res.data && res.data.role === role) {
                    setIsRole(true);
                } else {
                    setIsRole(false);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setIsRole(false);
            } finally {
                setLoading(false);
            }
        };

        if (auth) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [auth, role]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Add additional logging for debugging
    console.log('Auth:', auth);
    console.log('isRole:', isRole);

    if (isRole === null) {
        return <div>Loading...</div>;
    }

    return isRole ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRouteUser;
