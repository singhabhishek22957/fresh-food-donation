import { createBrowserRouter , createRoutesFromElements, Route } from "react-router-dom";  
import UserTesting from "./Components/User/UserTesting";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
           <Route path="/" element={<h1>Home</h1>} />  
           <Route path="*" element={<h1>Page Not Found</h1>} />
           <Route path="/user-testing" element={<UserTesting/>}/>
        </Route>
       
        

    )
)