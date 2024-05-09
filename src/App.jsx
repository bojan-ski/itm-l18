import { RecoilRoot } from "recoil"
import Login from "./components/Login"
import UserData from "./components/UserData"
import TasksList from "./components/TasksList"

const App = () => {
  return (
    <>
      <RecoilRoot>

        <div className="container">
          <div className="user-details">
            <UserData/>
            <Login/>
          </div>
          
          <TasksList/>
        </div>

      </RecoilRoot>
    </>
  )
}

export default App
