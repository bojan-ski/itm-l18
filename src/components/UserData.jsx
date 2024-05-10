import { useRecoilValue } from "recoil"
import { userState } from "../states/userState"

const UserData = () => {
    const userData = useRecoilValue(userState)

    return (
        <div className={userData.loggedIn ? 'user show' : 'user'}>
            {userData.loggedIn && <p>Hello {userData.username}</p>}
        </div>
    )
}

export default UserData