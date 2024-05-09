import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../states/userState"
import { useForm } from "react-hook-form"

const Login = () => {
    const setUserState = useSetRecoilState(userState)
    const userData = useRecoilValue(userState)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const formSubmit = (userCredentials) => {
        if (userCredentials.email !== 'admin@admin.com' || userCredentials.password !== '123456') {
            setError('errorData', {
                type: 'manuel',
                message: 'Entered credentials are incorrect'
            })
            return
        }

        setUserState({
            'username': 'Admin',
            'email': userCredentials.email,
            'loggedIn': true
        })
    }

    const logoutUser = () => {
        setUserState({ ...userData, 'loggedIn': false })
        console.log(userData);
    }

    return (
        !userData.loggedIn ?
            (
                <form className="login-form" onSubmit={handleSubmit(formSubmit)} >
                    
                    {errors.errorData && <p>{errors.errorData.message}</p>}
                    <input {...register('email')} type="text" placeholder="Please enter your email address" />
                    <input {...register('password')} type="password" placeholder="Please enter your password" />

                    <button type="submit">
                        Login
                    </button>
                </form>
            ) : (
                <button type="submit" className="logout-btn" onClick={logoutUser}>
                    Log Out
                </button>
            )
    )
}

export default Login