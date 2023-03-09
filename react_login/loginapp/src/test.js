import logo from './logo.svg';
import './App.css';
import Login from './components/Login.component';
import Appbar from './components/Appbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import UserPage from './components/Userpage';
import Managerpage from './components/Managerpage';

//both method works

// const Test = () => {
//     return (
//     <div className='test'>
//         <Appbar></Appbar>
//         <Signup></Signup>
//          </div>
//     )
// }

// export default Test;

// export default function Test() {
//     return (
//         <div>
//             <Appbar></Appbar>
//             <Signup></Signup>
//         </div>
//     )

// }

const Test = () => { 
    return (
        <div>
            <Appbar></Appbar> 
            <Signup></Signup>
        </div>
        )
    }

export default Test;


