import AuthService from '../../service/auth.service';
import { Navigate } from "react-router-dom";


export default function RequireAuth({ children }) {
    return !!AuthService.getCurrentUser() 
        ? children 
        : AuthService.isKnownMachine() 
        ? <Navigate to="/login" replace />
        : <Navigate to="/register" replace />;

}