import useAuth from "../../../utils/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TodoList from "../../components/TodoList";

export default function Home() {
    const { auth } = useAuth();
    // const [users, setUsers] = useState();

    // useEffect(() => {
    //     // let isMounted = true;
    //     // const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:4200/api/auth/users');
    //             // console.log(response.data);
    //             setUsers(response.data);
    //         } catch (err) {
    //             console.error(err);
                
    //         }
    //     }

    //     getUsers();

    // }, []);

    return (
        <div>
            <h1>Home</h1>
            {auth?.email && <h2>Log as {auth.email}</h2>}
            {!auth?.email ? (
                <><p>You have to be connected to your <Link to='/login'>account</Link> to be able to create and see your list.</p>
                <TodoList/></>
            ) : (
                // <h2>Log as {auth.email}</h2>
                <TodoList/>
            )}
            {/* <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.email}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article> */}
        </div>
    );
};