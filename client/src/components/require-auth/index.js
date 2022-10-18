import AuthService from '../../service/auth.service';
import { Navigate } from "react-router-dom";


export default function RequireAuth({ children }) {
    return !!AuthService.getCurrentUser() ? children : <Navigate to="/login" replace />;
}