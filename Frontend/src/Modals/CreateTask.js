import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskPopup = ({ modal, toggle, save, stateManage, setStateManage }) => {
    const [taskName, setTaskName] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('low');
    const [dueDate, setDueDate] = useState(null);
    const [togle, setTogle] = useState('toggle');

    const handleChange = (name, value) => {
        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'taskPriority') {
            setTaskPriority(value);
        } else if (name === 'dueDate') {
            setDueDate(value);
        }
    };

    async function handleAddTodo() {
        setLoading(true);
        try {
            // Get the token from localStorage
            const authToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';

            const response = await fetch('https://todoapp-f5si.onrender.com/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    Title: taskName,
                    Description: description,
                    Task_Priority: taskPriority,
                    Due_Date: dueDate,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setLoading(false);
                setTogle(toggle);
                setStateManage((prev) => !prev);
                console.log('This is Data', data);
                save(data.data.task);
                toggle();
            } else {
                const errorData = await response.json();
                console.error('Error creating task:', errorData.message);
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let taskObj = {
            Title: taskName,
            Description: description,
            Task_Priority: taskPriority,
            Due_Date: dueDate,
        };
        save(taskObj);
    };

    return (
        <Modal isOpen={modal} toggle={togle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={(e) => handleChange('taskName', e.target.value)} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={(e) => handleChange('description', e.target.value)} name="description"></textarea>
                </div>
                <div className="form-group">
                    <label>Task Priority</label>
                    <select className="form-control" value={taskPriority} onChange={(e) => handleChange('taskPriority', e.target.value)} name="taskPriority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => handleChange('dueDate', date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleAddTodo} disabled={loading}>
                    {!loading ? 'Create' : 'Creating...'}
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;