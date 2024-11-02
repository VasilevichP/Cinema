import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

function MainPage() {
    const navigate = useNavigate()
    const test = localStorage.getItem("role")
    return (
        <div>
            <Navbar />
            <div style={{width:'70%',marginRight:'auto',marginLeft:'auto',marginTop:'7em',display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:'20px'}}>
                <div className='maincard' onClick={(e)=>navigate(`/films`)}>
                    <p style={{fontSize:'32px',fontWeight:'bold',color:'white',marginBottom:'1em'}}>Информация о фильмах</p>
                    <p style={{fontSize:'16px',color:'white',width:'80%'}}>Просматривайте информацию обо всех имеющихся фильмах</p>
                </div>
                <div className='maincard' onClick={(e)=>navigate(`/schedule`)}>
                    <p style={{fontSize:'32px',fontWeight:'bold',color:'white',marginBottom:'1em'}}>Составление расписания</p>
                    <p style={{fontSize:'16px',color:'white',width:'80%'}}>Создавайте и изменяйте расписание на основе имеющихся фильмов</p>
                </div>
                <div className='maincard' onClick={(e)=>navigate(`/get_film`)}>
                    <p style={{fontSize:'32px',fontWeight:'bold',color:'white',marginBottom:'1em'}}>Добавление фильмов</p>
                    <p style={{fontSize:'16px',color:'white',width:'80%'}}>Приобретайте информацию о фильмах с помощью KinopoiskAPI</p>
                </div>    
                <div className='maincard' onClick={(e)=>navigate(`/halls`)}>
                    <p style={{fontSize:'32px',fontWeight:'bold',color:'white',marginBottom:'1em'}}>Информация о залах</p>
                    <p style={{fontSize:'16px',color:'white',width:'80%'}}>Добавляйте и изменяйте информацию о кинозалах вашего кинотеатра</p>
                </div>
            </div>
        </div>
    )
}
export default MainPage;