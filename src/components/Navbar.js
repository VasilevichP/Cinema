import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../images/logo.png"

export default function Navbar() {
    let navigate = useNavigate()
    function logoClicked() {
        navigate(`/mainpage`)
    }
    let role = localStorage.getItem('role')
  return (
    <div className="navbar">
        <div style={{display:'flex',gap:'30px',alignItems:'center'}}>
            <img src={logo} className="logo-img" alt='CINESOFT' onClick={logoClicked} />
            {role==1 &&
              <Link className="link" to="/accounts">Сотрудники</Link>
            }
            <Link className="link" to="/get_film">Получение фильма</Link>
            <Link className="link" to="/films">Фильмы</Link>
            <Link className="link" to="/halls">Залы</Link>
            <Link className="link" to="/schedule">Расписание</Link>
        </div>
        <Link className="link" to="/">Выход</Link>
    </div>
  )
}
