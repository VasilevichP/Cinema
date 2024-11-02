import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Delete from '../images/delete.png';

function Halls() {
    return (
        <div>
            <Navbar />
            <div style={{ width: '50%', margin: 'auto' }}>
                <div className="scroll-table" style={{ marginTop: '7em' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Номер</th>
                                <th style={{ width: '20%' }}>Разрешение</th>
                                <th style={{ width: '20%' }}>Количество мест</th>
                                <th style={{ width: '20%' }}>Статус</th>
                                <th style={{ width: '20%' }}>Удалить</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="scroll-table-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: '20%' }}>2</td>
                                    <td style={{ width: '20%' }}>3D</td>
                                    <td style={{ width: '20%' }}>290</td>
                                    <td style={{ width: '20%', cursor: 'pointer' }}>+</td>
                                    <td style={{ width: '20%' }}>
                                        <img src={Delete} className='delete-icon' />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%' }}>2</td>
                                    <td style={{ width: '20%' }}>3D</td>
                                    <td style={{ width: '20%' }}>290</td>
                                    <td style={{ width: '20%', cursor: 'pointer' }}>+</td>
                                    <td style={{ width: '20%' }}>
                                        <img src={Delete} className='delete-icon' />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%' }}>2</td>
                                    <td style={{ width: '20%' }}>3D</td>
                                    <td style={{ width: '20%' }}>290</td>
                                    <td style={{ width: '20%', cursor: 'pointer' }}>+</td>
                                    <td style={{ width: '20%' }}>
                                        <img src={Delete} className='delete-icon' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='container' style={{ marginTop: '2em' }}>
                <h3>Добавление кинозала</h3>
                <label>
                    <input required type="text" className="auth-reg-inp" placeholder="login_1234"/>
                    <span>Количество мест</span>
                </label>
                <label>
                    <select className='choose-select'>
                        <option>2D</option>
                        <option>3D</option>
                        <option>5D</option>
                        <option>7D</option>
                    </select>
                    <span>Разрешение</span>
                </label>
                <button className='auth-reg-button' type="submit">Добавить</button>
            </div>
        </div>
    )
}
export default Halls;