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
    const [inputIsModify, setInputIsModify] = useState(listValues.task);
    console.log(titleIsModify)

    const onTitleChangeHandler = (e) => {
        setListValues({...listValues, title: e.target.value});
    };

    const onInputChangeHandler = (e, taskId) => {
        const taskInputModify = inputIsModify.map((task) => 
            task.id === taskId ? { ...task, text: e.target.value } : task
        )
        setListValues(taskInputModify)
    }
    
    const addInputOnClick = () => {
        const taskLength = listValues.task.length;
        setListValues(
            {...listValues, 
            task : [
                ...listValues.task,
                {id: taskLength+1,text:"new test", isDone: false}
            ]
        })
        // console.log(listValues)
    };

    const deleteInputOnClick = (taskId) => {
        const filteredList = listValues.task.filter(task => task.id !== taskId);
        // console.log(filteredList)
        setListValues({...listValues, task : [...filteredList]});
    };

    const taskIsDoneOnClick = (taskId) => {
        const taskIsDone = listValues.task.filter((task) => {
            if(task.id === taskId) return task;
        });
        // console.log(taskIsDone)
        setListValues({...listValues, 
        task : listValues.task.map((task) => 
            task.id === taskId ? { ...task, isDone: !taskIsDone[0].isDone} : task
        )})
    };

    const modifyInputOnClick = (taskId) => {
        const taskInputModify = inputIsModify.map((task) => 
            task.id === taskId ? { ...task, modify:true } : {...task, modify:false}
        )
        setInputIsModify(taskInputModify)
    };

    return (
        <TodoForm onSubmit={(e)=>e.preventDefault()}>
            {!listValues?.title || titleIsModify ? (
                <TodoContainer>
                <TodoInput type="text" name="title" id="title" placeholder="Title" value ={listValues.title} onChange={(e) => onTitleChangeHandler(e)}/>
                <FontAwesomeIcon icon="check" onClick={() => setTitleIsModify(false)}/>
                </TodoContainer>
                
            ) : (
                <TodoContainer>
                <h2 >{listValues.title}</h2>
                <FontAwesomeIcon icon="wrench" onClick={() => setTitleIsModify(true)}/>
                </TodoContainer>
            )}
            {inputIsModify.length > 0 ? (
                inputIsModify.map((task, index) => {
                    return task?.modify === true ? (
                        (
                            <TodoContainer key={task.text + task.id + index}>
                                <TodoInput type="text" name={task.id + index} id={task.id + index} placeholder="Todo text" value={task.text} onChange={(e) => onInputChangeHandler(e, task.id)}/>
                                <div>
                                    <FontAwesomeIcon icon="check"/>
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