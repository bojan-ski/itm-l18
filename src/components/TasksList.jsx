import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../states/userState'
import { tasksState } from '../states/tasksState'
import AddTask from './AddTask'
import Categories from './Categories';
import SingleTask from './SingleTask';

const TasksList = () => {
    const userData = useRecoilValue(userState)
    const tasksList = useRecoilValue(tasksState)
    const listOfTasks = useSetRecoilState(tasksState)

    // edit task
    const [taskID, setTaskID] = useState('');
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskCategory, setEditTaskCategory] = useState('');

    const handleEditTask = (task) => {
        setTaskID(task.id);
        setEditTaskTitle(task.taskTitle);
        setEditTaskCategory(task.taskCategory);
    };

    const handleSaveEdit = (id) => {
        const updatedTasks = tasksList.map(task => {
            if (task.id === id) {
                const taskTitle = editTaskTitle.trim()
                const taskCategory = editTaskCategory
                return { ...task, taskTitle, taskCategory };
            }
            return task;
        });

        listOfTasks(updatedTasks);
        setTaskID('');
        setEditTaskTitle('');
        setEditTaskCategory('');
    };

    // delete task
    const handleDeleteTask = (id) => {
        const newTasksList = tasksList.filter(task => task.id !== id)
        listOfTasks(newTasksList)
    }

    return (
        userData.loggedIn && (
            <div className='tasks'>
                {/* user is able to add a new task */}
                <AddTask />

                {/* display list of tasks */}
                <div className='tasks-list'>
                    {tasksList.map(task => {
                        return (
                            <div key={task.id} className='task'>
                                {taskID === task.id ? (
                                    <>
                                        <div className='edit-task'>
                                            <input type="text" value={editTaskTitle} onChange={(e) => setEditTaskTitle(e.target.value)}
                                            />
                                            <select value={editTaskCategory} onChange={(e) => setEditTaskCategory(e.target.value)}
                                            >
                                                <Categories />
                                            </select>
                                        </div>

                                        <button type='button' onClick={() => handleSaveEdit(task.id)}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <SingleTask
                                            task={task}
                                            handleEditTask={handleEditTask}
                                            handleDeleteTask={handleDeleteTask}
                                        />
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default TasksList