import AdminDashboard from "./components/AdminDashboard/AdminDashboard"
import CardComp from "./components/DirectComp/CardComp"
import { ParticlesDemo } from "./components/DirectComp/ParticlesCard"
import AdminProfile from "./components/ProfilePage/AdminPage"
import UserProfile from "./components/ProfilePage/UserPage"
import UserDashboard from "./components/UserDashboard/UserDashboard"
import AdminPage from "./Pages/AdminPage"
import { ExampleComponentDemo } from "./Pages/AdminPageWithBg"
import CardPage from "./Pages/CardPage"
import SigninPage from "./Pages/SigninPage"
import  SignupPage from "./Pages/SignupPage"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    
      <div>
        <UserProfile/>
      </div>
    </BrowserRouter>
  )
}

export default App