import { useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../../utils/hooks/useAuth";

export default function RequireNotAuth() {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.token ? (
            <Navigate to="/" state={{ from: location }} replace />
        ) : (
            <Outlet/>
        )
    )
}