import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tasksState } from '../states/tasksState';
import { useForm } from "react-hook-form"
import Categories from './Categories';

const AddTask = () => {
    const listOfTasks = useSetRecoilState(tasksState)
    const tasks = useRecoilValue(tasksState)
    // console.log(tasks);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const formSubmit = (data) => {
        let existingTask;

        tasks.forEach(task => {
            const { taskTitle } = task
            taskTitle === data.taskTitle ? existingTask = true : existingTask = false
        })

        if (!existingTask) {
            const id = crypto.randomUUID()
            const taskTitle = data.taskTitle.trim()
            const taskCategory = data.taskCategory

            listOfTasks(currListOfTasks => [...currListOfTasks, { id, taskTitle, taskCategory }]);
        }
    }

    return (
        <form className='task-form' onSubmit={handleSubmit(formSubmit)}>
            {/* error msg */}
            {errors.taskTitle && <p>{errors.taskTitle.message}</p>}

            {/* input field for task title */}
            <input {...register('taskTitle', { required: 'Task title is required' })} type="text" placeholder="Enter Task (Task Title)" />

            {/* select field for task category */}
            <select {...register("taskCategory")} className='task-form-select'>
                <Categories/>
            </select>

            <button type="submit">
                Add Task
            </button>
        </form>
    )
}

export default AddTask