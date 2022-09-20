import { TodoForm, TodoInput, TodoContainer } from "../../../utils/style/TodoList";
import { Button } from "../../../utils/style/GlobalStyle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faCheck, faWrench);

export default function TodoList({userList}) {
    const initialForm = userList ? userList : { 
        title: 'd', 
        task: [
            { id: 0, text: 'd', isDone: false},
            { id: 1, text : "deed", isDone: false},
            { id: 2, text : "3", isDone: false}
        ]
    };
    const [listValues, setListValues] = useState(initialForm);
    const [titleIsModify, setTitleIsModify] = useState(false);

    // console.log(...listValues.task)

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
        const taskLength = listValues.task.length;
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

    const modifyInputOnClick = (taskId) => {
        const taskModifyState = listValues.task.map((task) => {
                if(taskId === false) return {...task, modify:false};
                return task.id === taskId ? { ...task, modify:true } : {...task, modify:false}
            }
        )
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

    return (
        <TodoForm onSubmit={(e)=>e.preventDefault()}>
            {/* <p onClick={removeModifyKey} >pll</p>
            <pre>{JSON.stringify(listValues.task)}</pre> */}
            {!listValues?.title || titleIsModify ? (
                <TodoContainer onSubmit={(e)=>{
                    e.preventDefault();
                    setTitleIsModify(false)}
                }>
                <TodoInput type="text" name="title" id="title" placeholder="Title" value ={listValues.title} onChange={(e) => onTitleChangeHandler(e)}/>
                <FontAwesomeIcon icon="check" onClick={() => setTitleIsModify(false)}/>
                </TodoContainer>
                
            ) : (
                <TodoContainer onSubmit={(e)=>e.preventDefault()}>
                <h2 >{listValues.title}</h2>
                <FontAwesomeIcon icon="wrench" onClick={() => setTitleIsModify(true)}/>
                </TodoContainer>
            )}
            {listValues?.task.length > 0 ? (
                listValues.task.map((task, index) => {
                    return task?.modify === true ? (
                        (
                            <TodoContainer key={task.text + task.id + index} onSubmit={(e)=>{
                                e.preventDefault();
                                modifyInputOnClick(false);
                                }
                            }>
                                <TodoInput type="text" name={task.id + index} id={task.id + index} placeholder="Todo text" value ={task.text} onChange={(e) => onTaskChangeHandler(e, task.id)}/>
                                <div>
                                    <FontAwesomeIcon icon="check" onClick={()=>modifyInputOnClick(false)}/>
                                </div>
                            </TodoContainer>
                        
                        )
                    ) : (
                        <TodoContainer key={task.text + task.id + index} isDone={task.isDone}>
                            <p onClick={()=>modifyInputOnClick(task.id)}>{task.text} {task.id}</p>
                            <div>
                                <FontAwesomeIcon icon="check" onClick={()=>taskIsDoneOnClick(task.id)}/>
                                <FontAwesomeIcon icon="trash" onClick={()=>deleteInputOnClick(task.id)}/>
                            </div>
                        </TodoContainer>
                    )
                })
            ) : (
                <TodoContainer>
                    <TodoInput type="text" name="list-1" id="list-1" placeholder="Todo text" />
                    <div>
                        <FontAwesomeIcon icon="check"/>
                        <FontAwesomeIcon icon="trash"/>
                    </div>
                </TodoContainer>
            )}
            
            <Button onClick={addInputOnClick}>Add a task</Button>
        </TodoForm>
    )
}