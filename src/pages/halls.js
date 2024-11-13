import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Delete from '../images/delete.png';
import Modal from "react-modal";

function Halls() {
    const [halls, setHalls] = useState([]);
    useEffect(() => {
        loadHalls();
    }, [])
    const loadHalls = async () => {
        const hs = await axios.get("http://localhost:8080/hall/halls");
        console.log("halls", hs.data)
        setHalls(hs.data);
    }
    const [permission, setPerm] = useState('2')
    function handleChange(event) {
        setPerm(event.target.value);
    }
    const [places, setPlaces] = useState('')
    const add = async (e) => {
        e.preventDefault()
        const hall = { permission, places }
        console.log(hall)
        try {
            const response = await axios.post("http://localhost:8080/hall/add",
                hall
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadHalls();
                    setPlaces('');
                    setPerm('2');
                    break;
                case 1:
                    break;
                default:
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const { id } = useParams();
    const deleteHall = async (id) => {
        console.log("loginDel: ", id)
        try {
            const response = await axios.delete(`http://localhost:8080/hall/delete/${id}`)
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadHalls();
                    break;
                case 1:
                    break;
                default:
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const changeHall = async (id) => {
        console.log("loginDel: ", id)
        try {
            const response = await axios.put(`http://localhost:8080/hall/change_status/${id}`)
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadHalls();
                    break;
                case 1:
                    break;
                default:
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const [confirm, setConfirm] = useState('')
    const [hall_id, setHall_id] = useState('')
    let [showModal, setShowModal] = useState(false)
    function showMod(h_id, conf) {
        setConfirm(conf);
        setHall_id(h_id)
        setShowModal(true)
    }
    function closeMod() {
        setConfirm('');
        setHall_id('')
        setShowModal(false)
    }
    return (
        <div>
            <Navbar />
            <Modal isOpen={showModal} onRequestClose={()=>setShowModal(false)}
                className="modal-content">
                <p>{confirm}</p>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className='mod-conf-btn' onClick={() => { setShowModal(false); deleteHall(hall_id) }}>Да</button>
                    <button className='mod-decl-btn' onClick={() => closeMod()}>Нет</button>
                </div>
            </Modal>
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
                                {
                                    halls.map((hall, index) => (
                                        <tr>
                                            <td style={{ width: '20%' }}>{hall.id}</td>
                                            <td style={{ width: '20%' }}>{hall.permission}D</td>
                                            <td style={{ width: '20%' }}>{hall.places}</td>
                                            {hall.status == 1 &&
                                                <td style={{ width: '20%', cursor: 'pointer' }}
                                                    onClick={() => changeHall(hall.id)}>+</td>
                                            }
                                            {hall.status == 0 &&
                                                <td style={{ width: '20%', cursor: 'pointer' }}
                                                    onClick={() => changeHall(hall.id)}>-</td>
                                            }
                                            <td style={{ width: '20%' }}>
                                                <img src={Delete} className='delete-icon'
                                                    onClick={() => showMod(hall.id, "Вы уверены, что хотите удалить зал?")} />
                                            </td>
                                        </tr>
                                    )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='container' style={{ marginTop: '2em' }}>
                <h3>Добавление кинозала</h3>
                <form className='container-form' onSubmit={add}>
                    <label>
                        <input required type="number" min="0" className="auth-reg-inp" placeholder="Количество мест"
                            value={places} onChange={(e) => setPlaces(e.target.value)} />
                        <span>Количество мест</span>
                    </label>
                    <label>
                        <select className='choose-select' value={permission} onChange={handleChange}>
                            <option value='2'>2D</option>
                            <option value='3'>3D</option>
                            <option value='5'>5D</option>
                            <option value='7'>7D</option>
                        </select>
                        <span>Разрешение</span>
                    </label>
                    <button className='auth-reg-button' type="submit">Добавить</button>
                </form>
            </div>
        </div>
    )
}
export default Halls;