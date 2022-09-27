import { Link } from "react-router-dom";
import HeaderStyle from "../../../utils/style/HeaderStyle";
import useAuth from "../../../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = async() => {
        setAuth({});
        navigate('/');
    };
    return (
        <HeaderStyle>
            <nav>
                <ul className="mainNavUl">
                    <li><Link to={'/'}>Home</Link></li>
                    { !auth?.token ? (
                    <>
                        <li><Link to={'/signup'}>Signup</Link></li>
                        <li><Link to={'/login'}>Login</Link></li>
                    </> ) : (
                        <>
                        {/* <li><Link to={'/profile'}>Profile</Link></li> */}
                        <li><button onClick={logout}>Logout</button></li>
                        </>
                    )}
                    
                </ul>
            </nav>
        </HeaderStyle>
    );
};