import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import test from "../images/test_photo.png"

function Schedule() {
    const [show, setShow] = useState(false);
    return (
        <div >
            <Navbar />
            {show &&
                <div className='modalBackground' id="modal">
                    <div className='modalActive'>
                        <div className='modalClose' onClick={() => setShow(false)}>
                            <p style={{ fontSize: '30px', color: '#212121', width: '96%', textAlign: 'end' }}>x</p>
                        </div>
                        <div className='modalWindow'>
                            <p>Название: </p>
                            <label className='modalLabel'>
                                <select className='modalInput' style={{ width: '102%' }}>
                                    <option>Зал 1</option>
                                    <option>Зал 2</option>
                                    <option>Зал 3</option>
                                    <option>Зал 4</option>
                                </select>
                                <span>Зал</span>
                            </label>
                            <label className='modalLabel'>
                                <input type="date" className='modalInput' />
                                <span>Дата</span>
                            </label>
                            <label className='modalLabel'>
                                <input type="time" className='modalInput' />
                                <span>Время</span>
                            </label>
                            <p style={{ marginTop: '10px' }}>Время конца:</p>
                            <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                                <button className='modalGreenBtn'>Добавить</button>
                                <button className='modalRedBtn'>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', marginTop: '5em' }}>
                <div style={{ width: '12%' }}>
                    <div className='film-scroll'>
                        <div className="card" onClick={() => setShow(true)}>
                            <img src={test} alt="test" className="card-img" />
                            <p>Provnmtjrfbehurtncnvbhyerhbvyrthgyrtyghtryghytryu</p>
                            <p>100 byh</p>
                            <p>3D</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: '85%' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <select className='filter-select'>
                            <option disabled>Зал</option>
                            <option>Все залы</option>
                        </select>
                        <select className='filter-select'>
                            <option disabled>День</option>
                            <option>Все дни</option>
                        </select>
                    </div>
                    <div id='cont'>
                        <div className="schedule-card">
                            <h4>15.09.2024</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ width: '5%' }}>
                                    <p>Зал 1</p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                    <div className='timetable'>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ width: '5%' }}>
                                    <p>Зал 1</p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                    <div className='timetable'>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="schedule-card">
                            <h4>15.09.2024</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ width: '5%' }}>
                                    <p>Зал 1</p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                    <div className='timetable'>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ width: '5%' }}>
                                    <p>Зал 1</p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                    <div className='timetable'>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>8:00</p>
                                        <p>0:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Schedule;