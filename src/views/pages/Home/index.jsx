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

    useEffect(() => {
        setIsLoading(true)
        const getUsers = async () => {
            try {
            const response = await axios.get(
                `http://localhost:4200/api/todolist`, 
                { headers: { "Authorization" : `Bearer ${auth.token}` }}
            );
            setTodoList(response.data);
            } catch (err) {
                console.error(err);
                
            } finally{
                setIsLoading(false)
            }
        }
        if(auth?.token) getUsers();
    }, [auth]);

    const createNewList = async() => {
        const emptyList = { 
            title: "New list",
            task:[]
        };
        try {
            const response = await axios.post(`http://localhost:4200/api/todolist`, emptyList, { headers:{"Authorization" : `Bearer ${auth.token}`}});
            const newList = response.data;
            setTodoList([...todoList, newList]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteList = async(id) => {
        try {
            await axios.delete(`http://localhost:4200/api/todolist/${id}`, { headers:{"Authorization" : `Bearer ${auth.token}`}});
            const removeTodoList = todoList.filter(list => list._id !== id);
            setTodoList(removeTodoList);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            {auth?.email && <Button onClick={createNewList}>Create</Button>}
            {auth?.email ? (
                <TodoDiv>
                    {isLoading ? (
                        <TodoList/>
                        ) : (
                        todoList.map((list) => {
                            return <TodoList 
                                deleteTodoList={() => deleteList(list._id)}
                                key={list._id} 
                                userList={list}
                            />
                        })
                    ) }
                </TodoDiv>
            ) : (
                <p>You have to be connected to your <Link to='/login'>account</Link> to be able to create and see your list.</p>
            )}
        </div>
    );
};