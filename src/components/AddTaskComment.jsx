import { useForm } from 'react-hook-form'

const AddTaskComment = ({ id, postTaskComment }) => {
    const { register, handleSubmit } = useForm()

    const commentSubmit = (data) => {
        postTaskComment(data)
    }

    return (
        <form className='comments-form' onSubmit={handleSubmit(commentSubmit)}>
            <input {...register('comment')} type="text" placeholder='enter comment' />
            <input {...register('taskID')} type="hidden" defaultValue={id} />
            <button type='submit' className='btn-post-comment'>
                Post comment
            </button>
        </form>
    )
}

export default AddTaskComment