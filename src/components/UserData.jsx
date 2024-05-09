import { useRecoilValue } from "recoil"
import { userState } from "../states/userState"

const UserData = () => {
    const userData = useRecoilValue(userState)

    return (
        <>
            {userData.loggedIn && <p>Hello {userData.username}</p>}
        </>

    )
}

export default UserData