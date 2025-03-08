import AddUser from './adduser/addUser';
import User from './getUser/user';
import Update from './updateUser/update';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const route = createBrowserRouter([
   {
    path:"/",
    element:<User/>,
   },
   {
    path:"/add",
    element:<AddUser/>,
   },
   {
    path:"/update/:id",
    element:<Update />,
   },
  ]);
  return (
    <div className="App">
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
