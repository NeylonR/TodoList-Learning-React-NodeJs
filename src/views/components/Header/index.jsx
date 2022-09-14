import { Link } from "react-router-dom";
import HeaderStyle from "../../../utils/style/HeaderStyle";

export default function Header() {
    return (
        <HeaderStyle>
            <nav>
                <ul className="mainNavUl">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/signup'}>Signup</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                </ul>
            </nav>
        </HeaderStyle>
    );
};