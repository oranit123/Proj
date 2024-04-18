import {createBrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import MyTasks from './Pages/MyTasks';
import Categories from './Pages/Categories';
import AverageGraph from './Pages/AverageGraph';
import AddTasks from './Pages/AddTasks';
import TasksDetails from './Pages/TasksDetails';
import EditTasks from './components/EditTasks';
import AddCategory from './Pages/AddCategory';
import EditCategory from './components/EditCategory';
import DeleteCategory from './components/DeleteCategory';
import Login from './Pages/Login';
import Registration from './Pages/Registration'
import LogOut from './Pages/LogOut';


export const routes =createBrowserRouter([
    {
     path:'/',element:<Home/>
    },
{
    path:'/MyTasks',element:<MyTasks/>
},
{
    path:'/Categories',element:<Categories/>
},
{
   path:'/Categories/AddCategory' ,element:<AddCategory/>
},
{
      path:'/Categories/EditCategory/:categoryName' ,element:<EditCategory/>
},
{
       path:'Categories/:categoryName' ,element:<DeleteCategory/>
},
{
    path:'/AverageGraph',element:<AverageGraph/>
},
{
    path:'/MyTasks/AddTasks',element:<AddTasks/>
},
{
    path: '/MyTasks/:nameTasks', 
    element: <TasksDetails/>
 
},
{
    path:"/MyTasks/EditTasks/:nameTasks" ,element:<EditTasks/>

},
{
    path:'/Categories/MyTasks/:nameTasks',element:<TasksDetails/>
},
{
    path:'/Home/Login',element:<Login/>
},
{
    path:'/Home/Registration' , element:<Registration/>
},
{
    path:'/Registration/Login' ,element:<Login/>
},
{
    path:'/Login',element:<Login/>
},
{
    path:'/LogOut',element:<LogOut/>
},
{
    path:'/LogOut/Login', element:<Login/>
},
{
    path:'/Login/Registration' ,element:<Registration/>
},

{
    path:'/Registration' ,element:<Registration/>
}

]);