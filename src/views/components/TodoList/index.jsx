import { TodoListArticle, TodoInput, TodoForm, TodoDiv } from "../../../utils/style/TodoList";
import { Button } from "../../../utils/style/GlobalStyle";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../utils/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faCheck, faWrench);

export default function TodoList({userList, deleteTodoList}) {
    const initialForm = userList ? userList : {
        title: '', 
        task: []
    };
    const [listValues, setListValues] = useState(initialForm);
    const [titleIsModify, setTitleIsModify] = useState(false);
    const { auth } = useAuth();
    const uid = crypto.randomUUID();
    const [errored, setErrored] = useState("");

    const onTitleChangeHandler = (e) => {
        setListValues({...listValues, title: e.target.value});
    };

    const titleValidate = (title) => {
        if(title.length < 4 || title.length > 40) return;
        setTitleIsModify(false);
    };

    const onTaskChangeHandler = (e, taskId) => {
        setListValues({...listValues, 
        task : listValues.task.map((task) => 
            task.id === taskId ? { ...task, text: e.target.value, isNew: false } : task
        )})
    };
    
    const addInputOnClick = () => {
        setListValues(
            {...listValues, 
            task : [
                ...listValues.task,
                {id: uid,text:"", isDone: false, isNew: true}
            ]
        })
    };

    const deleteInputOnClick = (taskId) => {
        const filteredList = listValues.task.filter(task => task.id !== taskId);
        setListValues({...listValues, task : [...filteredList]});
    };

    const taskIsDoneOnClick = (taskId) => {
        const taskIsDone = listValues.task.filter((task) => {
            if(task.id === taskId) return task;
        });
        setListValues({...listValues, 
        task : listValues.task.map((task) => 
            task.id === taskId ? { ...task, isDone: !taskIsDone[0].isDone} : task
        )})
    };

    const modifyInputOnClick = (taskId, confirm) => {
        const hasOneEmptyText = listValues.task.map((task) => (
            task?.text?.toString().length <= 0 ? true : task
        ));

        const taskModifyState = listValues.task.map((task) => {
            if(hasOneEmptyText.includes(true)) return task;
            if(confirm) return {...task, modify:false};
            return task.id === taskId ? { ...task, modify:true } : {...task, modify:false}
        });

        setListValues({...listValues, task : [...taskModifyState]});   
    };

    // const removeModifyKey = () => {
    //     const taskModifyState = listValues.task.map((task) => {
    //         //remove the "modify" key
    //         const { ["modify"]: unused, ...objRest } = task;
    //         return objRest;
    //     }
    // )
    // setListValues({...listValues, task : [...taskModifyState]}); 
    // }

    const saveList = async() => {
        try {
            await axios.put(`http://localhost:4200/api/todolist/${listValues._id}`, {...listValues}, { headers:{"Authorization" : `Bearer ${auth.token}`}})
            setErrored('');
        } catch (error) {
            console.error(error)
            setErrored(error.response.data.message);
        }
    };

    return (
        <TodoListArticle onSubmit={(e)=>e.preventDefault()}>
            {errored.length > 1 && <p>{errored}</p>}
            <FontAwesomeIcon icon="trash" onClick={deleteTodoList}/>
            {!listValues?.title || titleIsModify ? (
                <TodoForm onSubmit={(e)=>{
                    e.preventDefault();
                    titleValidate(listValues.title)}
                }>
                <TodoInput 
                    autoFocus
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Title" 
                    value={listValues.title} onChange={
                        (e) => onTitleChangeHandler(e)
                        }
                />
                <FontAwesomeIcon icon="check" onClick={() => titleValidate(listValues.title)}/>
                </TodoForm>
                
            ) : (
                <TodoDiv onSubmit={(e)=>e.preventDefault()}>
                <h2 >{listValues.title}</h2>
                <FontAwesomeIcon icon="wrench" onClick={() => setTitleIsModify(true)}/>
                </TodoDiv>
            )}
            {listValues?.task ? (
                listValues.task.map((task, index) => {
                    return task?.modify === true || task?.isNew === true ? (
                        (
                            <TodoForm key={task.id + index} onSubmit={(e)=>{
                                e.preventDefault();
                                modifyInputOnClick(task.id, true);
                                }
                            }>
                                <TodoInput 
                                    autoFocus
                                    type="text" 
                                    name={task.id + index} 
                                    id={task.id + index} 
                                    placeholder="Todo text" 
                                    value={task.text} 
                                    onChange={(e) => onTaskChangeHandler(e, task.id, index)}
                                />
                                <div>
                                    <FontAwesomeIcon icon="check" onClick={()=>modifyInputOnClick(task.id, true)}/>
                                </div>
                            </TodoForm>
                        
                        )
                    ) : (
                        <TodoForm key={task.id + index} isDone={task.isDone}>
                            <p onClick={()=>modifyInputOnClick(task.id)}>{task.text}</p>
                            <div>
                                <FontAwesomeIcon icon="check" onClick={()=>taskIsDoneOnClick(task.id)}/>
                                <FontAwesomeIcon icon="trash" onClick={()=>deleteInputOnClick(task.id)}/>
                            </div>
                        </TodoForm>
                    )
                })
            ) : (
                <TodoForm>
                    <TodoInput type="text" name="list-1" id="list-1" placeholder="Todo text" />
                    <div>
                        <FontAwesomeIcon icon="check"/>
                        <FontAwesomeIcon icon="trash"/>
                    </div>
                </TodoForm>
            )}
            
            <Button onClick={addInputOnClick}>Add a task</Button>
            <Button onClick={saveList}>Save</Button>
        </TodoListArticle>
    )
}