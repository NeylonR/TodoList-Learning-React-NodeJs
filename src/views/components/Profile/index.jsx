import useAuth from "../../../utils/hooks/useAuth";
export default function Home() {
    const { auth } = useAuth();
    return (
        <div>
            <h1>Profile</h1>
            {auth?.email && <h2>Your email : {auth.email}</h2>}
            {auth?.password && <h2>Your password : {auth.password}</h2>}
        </div>
    );
};