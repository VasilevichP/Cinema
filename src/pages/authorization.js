import { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Toast from '../components/Toast';

function App() {
  localStorage.removeItem('role')
  const[login,setLogin] = useState('')
  const[password,setPassword] = useState('')
  const[error, setError]= useState('')
  const[toastMsg, setToastMsg]= useState('')  
  const[toastClass, setToastClass]= useState('')
  const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };
  let navigate = useNavigate()
  const enter= async (e)=>{
    e.preventDefault()
    const account = {login,password}
    console.log(account)
    try{
      const response = await axios.post("http://localhost:8080/account/authorize",
        account
      )
      let status = response.data;
      console.log("data",status)
      
      switch(status){
        case 0: 
          localStorage.setItem("role",0)
          navigate(`/mainpage`);
          break;
        case 1:
          localStorage.setItem("role",1)
          navigate(`/mainpage`);
          break;
        default:
          setToastClass("toast err-toast")
          setToastMsg("Неправильный логин и/или пароль")
          handleShowToast()
        console.log("nope");  
        break;
      }
    } catch(err){
      console.log("error: ")
    }
  }
  return (
    <div className="App">
      <div style={{textAlign:'center',marginTop:"4em"}}>
        <h1>CINESOFT</h1>
        <h2>Средство автоматизации работы вашего кинотеатра</h2>
        <div className='container'>
          <h3>Авторизация</h3>
          <form onSubmit={enter} className="container-form">
          <label>
            <input name="login" required type="text" className="auth-reg-inp" placeholder="login_1234"
            value={login} onChange={(e)=>setLogin(e.target.value)}
            />
            <span>Логин</span>
          </label>
          <label>
            <input name="password" required type="password" className="auth-reg-inp" placeholder="Password_0"
            value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            <span>Пароль</span>
          </label>
          <button className='auth-reg-button' type="submit">Войти</button>
         </form>
        </div>
        {showToast && <Toast message={toastMsg} onClose={handleCloseToast} cl={toastClass}/>}
      </div>
    </div>
  );
}

export default App;
