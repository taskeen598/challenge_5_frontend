import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTaskPopup from '../Modals/CreateTask';
import Card from './Cards';
import axios from 'axios';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [stateManage, setStateManage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleGetALLTodo();
    }, [stateManage]);

    const handleGetALLTodo = async () => {
        try {
            setLoading(true);
            const authToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
            const response = await axios.get("https://todoapp-f5si.onrender.com/my-tasks", {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = response.data;
            console.log(data.data);
            setLoading(false);
            setTaskList(data.data);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://todoapp-f5si.onrender.com/delete-task/${id}`, {
                method: "delete",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`,
                },
            });

            const data = await response.json();
            console.log(data.message);
            setStateManage((prev) => !prev);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const toggle = () => {
        setModal(!modal);
    };

    const handleButtonClick = () => {
        toast.info('I have implemented all functionalities  and (collaborator bonus) in backend but unable to implement frontend', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000, // 5 seconds
        });
    };

    return (
        <>
            <div className="header text-center">
                <h3>Notes App</h3>
                <div>
                    <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
                        Create Task
                    </button>
                    <button className="btn btn-secondary mt-2" onClick={handleButtonClick}>
                        Click Me
                    </button>
                </div>
            </div>
            <div className="task-container">
                {loading ? (
                    <h2>"Loading..."</h2>
                ) : (
                    taskList &&
                    taskList.map((obj, index) => (
                        <Card
                            key={index + "card-task-main"}
                            stateManage={stateManage}
                            setStateManage={setStateManage}
                            taskObj={obj}
                            index={index}
                            deleteTask={deleteTask}
                            updateListArray={updateListArray}
                        />
                    ))
                )}
            </div>
            <CreateTaskPopup toggle={toggle} modal={modal} stateManage={stateManage} setStateManage={setStateManage} />
            <ToastContainer />
        </>
    );
};

export default TodoList;