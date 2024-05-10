import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tasksState } from '../states/tasksState'
import AddTaskComment from "./AddTaskComment"

const SingleTask = ({ task, handleEditTask, handleDeleteTask }) => {
    const { id, taskTitle, taskCategory, taskComments } = task

    const tasksList = useRecoilValue(tasksState)
    const listOfTasks = useSetRecoilState(tasksState)

    const postTaskComment = (data) => {
        const commentsList = tasksList.map(task => {
            if (task.id === data.taskID) {
                const currTaskComments = task.taskComments

                return {
                    ...task,
                    taskComments: [...currTaskComments, data.comment]
                }
            }
            return task
        })

        listOfTasks(commentsList)
    }

    const deleteTaskComment = (comment, taskID) => {
        const commentsList = tasksList.map(task => {
            if (task.id === taskID) {
                const updatedCommentsList = task.taskComments.filter(taskComment => taskComment !== comment)

                return {
                    ...task,
                    taskComments: updatedCommentsList
                }
            }
            return task
        })
        listOfTasks(commentsList)
    }

    return (
        <>
            <section className="task-details">
                <p>{taskTitle}</p>
                <p>{taskCategory}</p>

                <button type='button' onClick={() => handleEditTask(task)}>
                    Edit
                </button>

                <button type='button' onClick={() => handleDeleteTask(id)}>
                    Delete
                </button>
            </section>

            <section className='post-comment'>
                <AddTaskComment id={id} postTaskComment={postTaskComment} />
            </section>

            <section className='comments'>
                {taskComments ? (
                    taskComments.map((comment, idx) => {
                        return <div key={idx}>
                            <p>
                                {comment}
                            </p>
                            <button type='button' onClick={() => deleteTaskComment(comment, id)}>
                                Delete Comment
                            </button>
                        </div>
                    })
                ) : ('')}
            </section>
        </>
    )
}

export default SingleTask