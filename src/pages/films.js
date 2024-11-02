import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchImg from '../images/search_button.png';
import test from "../images/test_photo.png"

function Films() {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent:'space-between', margin: 'auto', width: '80%', marginTop: '7em',height:'2.5em' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <select className='filter-select'>
                        <option disabled>Жанр</option>
                        <option>Жанры</option>
                    </select>
                    <select className='filter-select'>
                        <option disabled>Продолжительность</option>
                        <option>По возрастанию</option>
                        <option>По убыванию</option>
                    </select>
                </div>
                <div className='search'>
                    <input className='search-input' placeholder='Введите название фильма'/>
                    <button className='search-button'>
                        <img src={SearchImg} alt='Search' style={{width:'40%'}}></img>
                    </button>
                </div>
            </div>
            <div style={{margin: 'auto', width: '80%', marginTop: '2em'}}>
                <div className='name-board'>
                    <div style={{width:'20%'}}>
                        <img src={test} alt="no image" style={{width:'100%',  height: '300px'}} />
                    </div>
                    <div style={{width:'60%',gap:'5px',display:'flex',flexDirection:'column',fontSize:'14px'}}>
                        <h3 style={{marginBottom:'15px'}}>Случай на кладбище</h3>
                        <p>Жанры: хоррор, триллер</p>
                        <p>Возрастное ограничение: 18+</p>
                        <p>Продолжительность фильма: 119 минут</p>
                        <p>Срок возврата: 27.03.2025</p>
                    </div>
                </div>
                <div className='name-board'>
                    <div style={{width:'20%'}}>
                        <img src={test} alt="no image" style={{width:'100%',  height: '300px'}} />
                    </div>
                    <div style={{width:'60%',gap:'5px',display:'flex',flexDirection:'column',fontSize:'14px'}}>
                        <h3 style={{marginBottom:'15px'}}>Случай на кладбище</h3>
                        <p>Жанры: хоррор, триллер</p>
                        <p>Возрастное ограничение: 18+</p>
                        <p>Продолжительность фильма: 119 минут</p>
                        <p>Срок возврата: 27.03.2025</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Films;