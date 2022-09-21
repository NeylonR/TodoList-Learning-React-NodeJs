import useAuth from "../../../utils/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TodoList from "../../components/TodoList";
import { Button } from "../../../utils/style/GlobalStyle";
import { TodoDiv } from "../../../utils/style/TodoList";

export default function Home() {
    const { auth } = useAuth();
    const [todoList, setTodoList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // console.log(auth?.token?.userId)
    console.log(todoList)

    useEffect(() => {
        // console.log('useeffect')
        setIsLoading(true)
        const getUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4200/api/todolist`, 
                    { headers: { "Authorization" : `Bearer ${auth.token}` }}
                );
                // console.log(...response.data);
                setTodoList(response.data);
                
            } catch (err) {
                console.error(err);
                
            } finally{
                setIsLoading(false)
            }
        }
        getUsers();

    }, [auth]);

    const createList = () => {
        setTodoList([...todoList, {_id: 'test', title: '', 
        task: [
        ]}])
    }

    return (
        <div>
            <h1>Home</h1>
            {auth?.email && <h2>Log as {auth.email}</h2>}
            {auth?.email ? (
                <TodoDiv>
                    
                    {/* <TodoList/> */}
                    {isLoading ? (
                        <TodoList/>
                        ) : (
                        todoList.map((list) => {
                            console.log(list._id)
                            return <TodoList key={list._id} userList={list}/>
                        })
                    ) }
                </TodoDiv>
            ) : (
                // <h2>Log as {auth.email}</h2>
                <p>You have to be connected to your <Link to='/login'>account</Link> to be able to create and see your list.</p>
                // <TodoList/>
            )}
            <Button onClick={createList}>Create</Button>
        </div>
    );
};