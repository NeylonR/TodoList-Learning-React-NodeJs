import { TodoListArticle, TodoInput, TodoForm, SaveButton, TopArticle } from "../../../utils/style/TodoList";
import { Button } from "../../../utils/style/GlobalStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../utils/hooks/useAuth";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faCheck, faWrench);

export default function TodoList({userList, deleteTodoList}) {
    const uid = crypto.randomUUID();
    const initial = userList ? userList : {id:uid,title:'New Title', task:[]};
    const [listValues, setListValues] = useState(initial);
    const [titleIsModify, setTitleIsModify] = useState(false);
    const { auth } = useAuth();
    const [errored, setErrored] = useState("");
    const [isListValid, setIsListValid] = useState(true);
    const [allowNewTask, setAllowNewTask] = useState(true);
    const [animateValidation, setAnimateValidation] = useState(false);

    // return true if one of the task is an empty string
    const hasOneEmptyText = listValues.task.map((task) => (
        task?.text?.toString().trim().length <= 0 ? true : task
    ));

    useEffect(()=>{
        // handle isListValue for the display
        const isValid = () => {
            if(hasOneEmptyText.includes(true) || listValues.title.length < 4 || listValues.title.length > 40) return setIsListValid(false);
            return setIsListValid(true);
        };
        // if one task is being modified/empty user won't be able to modify another task of the list
        const newTaskIsAllowed = () => {
            const isAnyTaskModify = listValues.task.map((task) => {
                if(task.modify === true) return true;
            })
            if(hasOneEmptyText.includes(true)) return setAllowNewTask(false);
            if(isAnyTaskModify.includes(true)) return setAllowNewTask(false);
            return setAllowNewTask(true)
        };
        newTaskIsAllowed();
        isValid();
    },[listValues])

    const onTitleChangeHandler = (e) => {
        setListValues({...listValues, title: e.target.value});
    };

    const titleValidate = (title) => {
        if(title.length < 4 || title.length > 40) return false;
        setTitleIsModify(false);
    };

    const onTaskChangeHandler = (e, taskId) => {
        setListValues({...listValues, 
        task : listValues.task.map((task) => 
            task.id === taskId ? { ...task, text: e.target.value, isNew: false } : task
        )})
    };

    const addTaskOnClick = () => {
        setListValues(
            {...listValues, 
            task : [
                ...listValues.task,
                {id: uid, text:"", isDone: false, modify: true, isNew: true}
            ]
        })
    };

    const deleteTaskOnClick = (taskId) => {
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
        const taskModifyState = listValues.task.map((task) => {
            if(hasOneEmptyText.includes(true)) return task;
            if(confirm) return {...task, modify:false};
            return task.id === taskId ? { ...task, modify:true } : {...task, modify:false}
        }); 

        setListValues({...listValues, task : [...taskModifyState]});   
    };
    // PUT the actual list 
    const saveList = async() => {
        try {
            await axios.put(`http://localhost:4200/api/todolist/${listValues._id}`, {...listValues}, { headers:{"Authorization" : `Bearer ${auth.token}`}})
            setAnimateValidation(true);
            setErrored('');
            setIsListValid(false);
        } catch (error) {
            console.error(error)
            setErrored(error.response.data.message);
        }
    };

    return (
        <TodoListArticle onSubmit={(e)=>e.preventDefault()} className={animateValidation && "validating"}>
            {errored.length > 1 && <p>{errored}</p>}
            <FontAwesomeIcon title="Delete the list" className="deleteList" icon="trash" onClick={deleteTodoList}/>
            {!listValues?.title || titleIsModify ? (
                <TodoForm className="listTitle" onSubmit={(e)=>{
                    e.preventDefault();
                    titleValidate(listValues.title)}
                }>
                <TodoInput 
                    className="inputTitle"
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
                <div className="listTitle" onSubmit={(e)=>e.preventDefault()}>
                    <h2 >{listValues.title}</h2>
                    <FontAwesomeIcon icon="wrench" onClick={() => setTitleIsModify(true)}/>
                </div>
            )}
            {listValues?.task && (
                listValues.task.map((task, index) => {
                    return task?.modify === true || task?.isNew === true ? (
                        (
                            <TodoForm 
                                key={task.id + index} 
                                onSubmit={(e)=>{
                                    e.preventDefault();
                                    modifyInputOnClick(task.id, true);
                                    }
                                }
                                modify={task?.modify}
                            >
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
                            <p >{task.text}</p>
                            <div>
                                <FontAwesomeIcon icon="wrench" onClick={()=>modifyInputOnClick(task.id)}/>
                                <FontAwesomeIcon icon="check" onClick={()=>taskIsDoneOnClick(task.id)}/>
                                <FontAwesomeIcon title="Delete the task" icon="trash" onClick={()=>deleteTaskOnClick(task.id)}/>
                            </div>
                        </TodoForm>
                    )
                })
            )}
            
            <Button onClick={addTaskOnClick} disabled={!allowNewTask}>Add a task</Button>
            <SaveButton onClick={saveList} disabled={!isListValid}>Save</SaveButton>
            <TopArticle onAnimationEnd={()=>setAnimateValidation(false)}/> {/* used for animation */}
        </TodoListArticle>
    )
}

TodoList.propTypes = {
    userList: PropTypes.objectOf(
        PropTypes.shape(
            {
                _id: PropTypes.string.isRequired,
                creator_id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                task: PropTypes.arrayOf(
                    PropTypes.shape(
                        {
                            id: PropTypes.string.isRequired,
                            text: PropTypes.string.isRequired,
                            isDone: PropTypes.bool.isRequired,
                        }
                    )
                )
            }
        )
    ),
    deleteTodoList: PropTypes.func
}

// TodoList.defaultProps = {
//     userList: 
//         {
//             _id: 'uid',
//             creator_id: 'id',
//             title: 'New Title',
//             task: []
//         }
// };
// const removeModifyKey = () => {
//     const taskModifyState = listValues.task.map((task) => {
//         //remove the "modify" key
//         const { ["modify"]: unused, ...objRest } = task;
//         return objRest;
//     }
// )
// setListValues({...listValues, task : [...taskModifyState]}); 
// }