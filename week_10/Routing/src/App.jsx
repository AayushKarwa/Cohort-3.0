import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,Link,useNavigate, Outlet} from 'react-router-dom'

function App() {
  
  const [currentCount,SetcurrentCount] = useState(0);
  const timer = useRef();

 function StartClock(){
  let value = setInterval(()=>{
    SetcurrentCount((e)=>{
      return e+1
    })
  },1000);
  timer.current = value;
 }

 function StopClock(){
  clearInterval(timer.current)
 }

  return <div>
    {currentCount}
    <button onClick={StartClock}>start</button>
    <button onClick={StopClock}>stop</button>
  </div>

  
}







function Class11Program(){

  const navigate = useNavigate();

  function redirectUser(){
    navigate("/")
  }

  return <div>
    <h1>NEET PROGRAMS FOR CLASS 11</h1>
    <button onClick={redirectUser}>Go back to the landing page</button>
  </div>
}

function Class12Program(){
  return <div>
    <h1>NEET PROGRAMS FOR CLASS 12</h1>
  </div>
}

export default App
