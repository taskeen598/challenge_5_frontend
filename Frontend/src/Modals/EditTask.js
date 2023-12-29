import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj, stateManage, setStateManage }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [togle, setTogle] = useState('toggle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    async function handleUpdateTodo() {
        try {
            const authToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';

            const response = await axios.put(`https://todoapp-f5si.onrender.com/update-task/${taskObj._id}`, {
                Title: taskName,
                Description: description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                setTogle(toggle);
                if (stateManage) {
                    setStateManage(false);
                } else {
                    setStateManage(true);
                }
                console.log('Task updated successfully:', response.data);
                // Update the task in the parent component
                updateTask(response.data.data);
            } else {
                console.error('Error updating task:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    }

    useEffect(() => {
        setTaskName(taskObj.Title);
        setDescription(taskObj.Description);
    }, [taskObj]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdateTodo}>
                    Update
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;