import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import test from "../images/test_photo.png"
import SearchImg from '../images/search_button.png';

function GetFilm() {
    return (
        <div>
            <Navbar />
            <div style={{ width: '67%', margin: 'auto', marginTop: '7em', height: '40px', display: 'flex', justifyContent: 'end' }}>
                <div className='search'>
                    <input className='search-input' placeholder='Введите название фильма' />
                    <button className='search-button'>
                        <img src={SearchImg} alt='Search' style={{ width: '40%' }}></img>
                    </button>
                </div>
            </div>
            <div style={{ width: '67%', margin: 'auto', marginTop: '2em' }}>
                <div className='name-board'>
                    <div style={{ width: '35%' }}>
                        <img src={test} alt="no image" style={{ width: '100%', height: '330px' }} />
                    </div>
                    <div style={{ width: '60%', gap: '15px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Случай на кладбище</h3>
                        <p>Жанры: хоррор, триллер</p>
                        <p>Возрастное ограничение: 18+</p>
                        <p>Продолжительность фильма: 119 минут</p>
                        <table style={{ width: '70%',marginTop:'-6px' }}>
                            <tr>
                                <td>Разрешение фильма</td>
                                <td>
                                    <select className='choose-select'>
                                        <option>2D</option>
                                        <option>3D</option>
                                        <option>5D</option>
                                        <option>7D</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Срок возврата</td>
                                <td>
                                    <input type='number' min="0" className='auth-reg-inp' placeholder='Срок проката'></input>
                                </td>
                            </tr>

                        </table>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'end',height:'100%',alignItems:'end' }}>
                            <button className="auth-reg-button" style={{width:'auto',padding:'15px 20px'}}>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GetFilm;