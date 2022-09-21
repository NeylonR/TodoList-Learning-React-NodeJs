import { TodoListArticle, TodoInput, TodoForm, TodoDiv } from "../../../utils/style/TodoList";
import { Button } from "../../../utils/style/GlobalStyle";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../utils/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faCheck, faWrench);

export default function TodoList({userList}) {
    const initialForm = userList ? userList : {
        title: '', 
        task: [
        ]
    };
    const [listValues, setListValues] = useState(initialForm);
    const [titleIsModify, setTitleIsModify] = useState(false);
    const { auth } = useAuth();

    // console.log(...listValues.task)
    // console.log(JSON.parse(listValues.task[0]))

    const uid = crypto.randomUUID();

    const onTitleChangeHandler = (e) => {
        setListValues({...listValues, title: e.target.value});
    };

    const onTaskChangeHandler = (e, taskId) => {
        setListValues({...listValues, 
        task : listValues.task.map((task) => 
            task.id === taskId ? { ...task, text: e.target.value} : task
        )})
    };
    
    const addInputOnClick = () => {
        setListValues(
            {...listValues, 
            task : [
                ...listValues.task,
                {id: uid,text:"new test", isDone: false}
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
            task.text.toString().length <= 0 ? true : task
        ));

        const taskModifyState = listValues.task.map((task) => {
            if(hasOneEmptyText.includes(true)) return task;
            if(confirm) return {...task, modify:false};
            return task.id === taskId ? { ...task, modify:true } : {...task, modify:false}
        });

        setListValues({...listValues, task : [...taskModifyState]});   
    };

    const removeModifyKey = () => {
        const taskModifyState = listValues.task.map((task) => {
            //remove the "modify" key
            const { ["modify"]: unused, ...objRest } = task;
            return objRest;
        }
    )
    setListValues({...listValues, task : [...taskModifyState]}); 
    }

    const saveList = async() => {
        axios.post(`http://localhost:4200/api/todolist/create`, {...listValues}, { headers:{"Authorization" : `Bearer ${auth.token}`}})
            .then(res => {
                console.log(JSON.stringify(res))
            })
            .catch(error => {
                console.error(error)
            })
    };

    return (
        <TodoListArticle onSubmit={(e)=>e.preventDefault()}>
            {/* <p onClick={removeModifyKey} >pll</p>
            <pre>{JSON.stringify(listValues.task)}</pre> */}
            {!listValues?.title || titleIsModify ? (
                <TodoForm onSubmit={(e)=>{
                    e.preventDefault();
                    setTitleIsModify(false)}
                }>
                <TodoInput type="text" name="title" id="title" placeholder="Title" value={listValues.title} onChange={(e) => onTitleChangeHandler(e)}/>
                <FontAwesomeIcon icon="check" onClick={() => setTitleIsModify(false)}/>
                </TodoForm>
                
            ) : (
                <TodoDiv onSubmit={(e)=>e.preventDefault()}>
                <h2 >{listValues.title}</h2>
                <FontAwesomeIcon icon="wrench" onClick={() => setTitleIsModify(true)}/>
                </TodoDiv>
            )}
            {listValues?.task.length > 0 ? (
                listValues.task.map((task, index) => {
                    return task?.modify === true ? (
                        (
                            <TodoForm key={task.id + index} onSubmit={(e)=>{
                                e.preventDefault();
                                modifyInputOnClick(task.id, true);
                                }
                            }>
                                <TodoInput type="text" name={task.id + index} id={task.id + index} placeholder="Todo text" value={task.text} onChange={(e) => onTaskChangeHandler(e, task.id, index)}/>
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
            <Button onClick={saveList}>Save my list</Button>
        </TodoListArticle>
    )
}