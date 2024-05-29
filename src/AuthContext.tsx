import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authApi from './api/auth';
import { user } from './models';
import { useNavigate } from 'react-router-dom';
import { orderDetailsProduct } from './models/order';
import orderApi from './api/orderApi';

// Định nghĩa kiểu dữ liệu cho ngữ cảnh xác thực
interface AuthContextType {
    auth: user | null;
    setAuth: React.Dispatch<React.SetStateAction<user | null>>;
    orderDetails: orderDetailsProduct[] | [];
    setOrderDetails: React.Dispatch<React.SetStateAction<orderDetailsProduct[] | []>>;
}

// Khởi tạo ngữ cảnh với giá trị mặc định là null
const AuthContext = createContext<AuthContextType | null>(null);

// Tạo một hook để sử dụng ngữ cảnh xác thực dễ dàng
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Định nghĩa kiểu cho props của AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<user | null>(null);
    const [orderDetails, setOrderDetails] = useState<orderDetailsProduct[] | []>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            let res = await authApi.getUser();
            let resOrderDetails = await orderApi.getAllOrders()
            if(resOrderDetails.data){
                setOrderDetails(resOrderDetails.data)
            }
            if (res?.data) {
                setAuth(res.data);
            } else {
                setAuth(null);
            }
            // let admin = await authApi.adminOnly();
            // if(admin?.data.admin){
            //     navigate('admin/product');
            // }
        } catch (err) {
            console.log(err);
            setAuth(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [localStorage.getItem('access_token')]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, orderDetails, setOrderDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
