import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Modal from "react-modal";
import Toast from '../components/Toast';

function Schedule() {
    const [show, setShow] = useState(false);
    const [is_in_change, setIsInChange] = useState(false);
    const [movies, setMovies] = useState([]);
    const [dates, setDates] = useState([]);
    const [halls, setHalls] = useState([]);
    const [sch_dates, setSchDates] = useState([]);
    const [sch_halls, setSchHalls] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [chosen_date, setChosenDate] = useState('')
    const [chosen_hall, setChosenHall] = useState('0')
    const [chosen_movie_name, setChosenMovieName] = useState('');
    const [chosen_movie_id, setChosenMovieId] = useState('');
    const [chosen_session_id, setChosenSessionId] = useState('');
    const [chosen_halls, setChosenHalls] = useState([]);
    const [chosen_movie_hall, setChosenMovieHall] = useState('')
    const [chosen_movie_date, setChosenMovieDate] = useState("")
    const [chosen_movie_time, setChosenTime] = useState('8:00')
    const [chosen_end_time, setChosenEndTime] = useState('')
    const { id } = useParams();
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const dt = await axios.get("http://localhost:8080/schedule/show");
        console.log(dt.data)
        setHalls(dt.data.halls)
        setDates(dt.data.dates)
        setSchHalls(dt.data.sch_halls)
        setSchDates(dt.data.sch_dates)
        setChosenMovieDate(dt.data.dates[1])
        setShow(false)
        setIsInChange(false)
        setMovies(dt.data.movies)
        setSessions(dt.data.sessions)
    }
    function handleDateChange(event) {
        setChosenDate(event.target.value);
    }
    function handleHallChange(event) {
        setChosenHall(event.target.value);
    }
    const filter = async (e) => {
        console.log("in filter: ", chosen_date, chosen_hall)
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/schedule/filter", null, {
                params: {
                    hall: chosen_hall,
                    date: chosen_date
                },
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    setSchHalls(status.sch_halls)
                    setSchDates(status.sch_dates)
                    setChosenMovieDate(status.sch_dates[0])
                    setSessions(status.sessions)
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const movie_clicked = async (id) => {
        try {
            const response = await axios.post("http://localhost:8080/schedule/choose_movie", null, {
                params: {
                    id: id
                },
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    setChosenMovieName(status.movie.name)
                    setChosenMovieId(status.movie.id)
                    setChosenHalls(status.movie_halls)
                    setChosenMovieHall(status.movie_halls[0].id)
                    setShow(true)
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const session_clicked = async (ses_id) => {
        try {
            const response = await axios.post("http://localhost:8080/schedule/choose_session", null, {
                params: {
                    id: ses_id
                },
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    setChosenMovieName(status.movie_name)
                    setChosenSessionId(status.session.id)
                    setChosenHalls(status.movie_halls)
                    setChosenMovieHall(status.session.hall)
                    setIsInChange(true)
                    setChosenMovieDate(status.session.date)
                    setChosenTime(status.start_time)
                    setChosenEndTime(status.end_time)
                    setShow(true)
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const add = async (e) => {
        console.log("in add: ", chosen_movie_id, chosen_movie_hall, chosen_movie_date, chosen_movie_time)
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/schedule/add", null, {
                params: {
                    movie_id: chosen_movie_id,
                    hall: chosen_movie_hall,
                    str_date: chosen_movie_date,
                    str_time: chosen_movie_time
                },
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadData();
                    setShow(false)
                    setToastClass("toast succ-toast")
                    setToastMsg("Был добавлен новый сеанс")
                    handleShowToast()
                    break;
                case 1:
                    setToastClass("toast err-toast")
                    setToastMsg("Сеанс не может начинаться раньше 8:00")
                    handleShowToast()
                    break;
                case 2:
                    setToastClass("toast err-toast")
                    setToastMsg("Сеанс не может заканчиваться позже 0:00")
                    handleShowToast()
                    break;
                case 3:
                    setToastClass("toast err-toast")
                    setToastMsg("В это время зал занят")
                    handleShowToast()
                    break;
                default:
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const delete_session = async (id) => {
        console.log("in delete: ", id)
        try {
            const response = await axios.delete(`http://localhost:8080/schedule/delete/${id}`)
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadData();
                    setIsInChange(false)
                    setShow(false)
                    setToastClass("toast succ-toast")
                    setToastMsg("Сеанс был удален из расписания")
                    handleShowToast()
                    break;
                case 1:
                    setToastClass("toast err-toast")
                    setToastMsg("Возникла ошибка при удалении сеанса")
                    handleShowToast()
                    break;
                default:
                    setToastClass("toast err-toast")
                    setToastMsg("Возникла ошибка при удалении сеанса")
                    handleShowToast()
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const change = async (e) => {
        console.log("in change: ", chosen_session_id, chosen_movie_hall, chosen_movie_date, chosen_movie_time)
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8080/schedule/change", null, {
                params: {
                    session_id: chosen_session_id,
                    hall: chosen_movie_hall,
                    str_date: chosen_movie_date,
                    str_time: chosen_movie_time
                },
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    loadData();
                    setShow(false);
                    setIsInChange(false)
                    setToastClass("toast succ-toast")
                    setToastMsg("Расписание изменено")
                    handleShowToast()
                    break;
                case 1:
                    setToastClass("toast err-toast")
                    setToastMsg("Сеанс не может начинаться раньше 8:00")
                    handleShowToast()
                    break;
                case 2:
                    setToastClass("toast err-toast")
                    setToastMsg("Сеанс не может заканчиваться позже 0:00")
                    handleShowToast()
                    break;
                case 3:
                    setToastClass("toast err-toast")
                    setToastMsg("В это время зал занят")
                    handleShowToast()
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
    let [showModal, setShowModal] = useState(false)
    function showMod(conf) {
        setConfirm(conf);
        setShowModal(true)
    }
    function closeMod() {
        setConfirm('');
        setShowModal(false)
    }

    const [toastMsg, setToastMsg] = useState('')
    const [toastClass, setToastClass] = useState('')
    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };
    return (
        <div >
            <Navbar />
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}
                className="modal-content">
                <p>{confirm}</p>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className='mod-conf-btn' onClick={() => { setShowModal(false); delete_session(chosen_session_id) }}>Да</button>
                    <button className='mod-decl-btn' onClick={() => closeMod()}>Нет</button>
                </div>
            </Modal>
            {show &&
                <div className='modalBackground' id="modal">
                    <div className='modalActive'>
                        <div className='modalClose' onClick={() => {setIsInChange(false);setShow(false)}}>
                            <p style={{ fontSize: '30px', color: '#212121', width: '96%', textAlign: 'end' }}>x</p>
                        </div>
                        <div className='modalWindow'>
                            <p>Название: {chosen_movie_name} </p>
                            <label className='modalLabel'>
                                <select className='modalInput' style={{ width: '102%' }} required value={chosen_movie_hall} onChange={(e) => setChosenMovieHall(e.target.value)}>
                                    {
                                        chosen_halls.map((hall, index) => (
                                            <option value={hall.id}>Зал {hall.id}</option>
                                        )
                                        )}
                                </select>
                                <span>Зал</span>
                            </label>
                            <label className='modalLabel'>
                                <input type="date" className='modalInput' required min={dates[1]} max={dates[6]}
                                    value={chosen_movie_date} onChange={(e) => setChosenMovieDate(e.target.value)} />
                                <span>Дата</span>
                            </label>
                            <label className='modalLabel'>
                                <input type="time" className='modalInput' required
                                    value={chosen_movie_time} onChange={(e) => setChosenTime(e.target.value)} />
                                <span>Время начала</span>
                            </label>
                            {is_in_change &&
                                <p style={{ marginTop: "13px", fontSize: "14px", fontFamily: "sans-serif" }}>Время конца: {chosen_end_time}</p>
                            }
                            {!is_in_change &&
                                <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                                    <button className='modalGreenBtn' onClick={(e) => add(e)}>Добавить</button>
                                </div>
                            }
                            {is_in_change &&
                                <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                                    <button className='modalGreenBtn' onClick={(e) => change(e)}>Изменить</button>
                                    <button className='modalRedBtn' onClick={() => showMod("Вы уверены, что хотите удалить сеанс?")}>Удалить</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', marginTop: '5em' }}>
                <div style={{ width: '12%' }}>
                    <div className='film-scroll'>
                        {
                            movies.map((movie, index) => (
                                <div className="card" onClick={() => movie_clicked(movie.id)}>
                                    <img src={movie.poster} alt="test" className="card-img" />
                                    <p>{movie.name}</p>
                                    <p>{movie.movieLength} мин.</p>
                                    <p>{movie.permission}D</p>
                                </div>
                            )
                            )}
                    </div>
                </div>
                <div style={{ width: '85%' }}>
                    <div >
                        <form onSubmit={filter} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <select className='filter-select' value={chosen_hall} onChange={(e) => { handleHallChange(e) }}>
                                <option value='0'>Все залы</option>
                                {
                                    halls.map((hall, index) => (
                                        <option value={hall.id}>Зал {hall.id}</option>
                                    )
                                    )}
                            </select>
                            <select className='filter-select' value={chosen_date} onChange={(e) => { handleDateChange(e) }}>
                                <option value="">Все дни</option>
                                {
                                    dates.map((date, index) => (
                                        <option value={date}>{date}</option>
                                    )
                                    )}
                            </select>
                            <div>
                                <button className="filter-button" type='submit'>Применить фильтры</button>
                            </div>
                        </form>
                    </div>
                    <div id='cont'>
                        {
                            sch_dates.map((date, index) => (
                                <div className="schedule-card">
                                    <h4>{date}</h4>
                                    {
                                        sch_halls.map((hall, index) => (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>

                                                <div style={{ width: '5%' }}>
                                                    <p style={{ whiteSpace: "wrap" }}>Зал {hall.id} {hall.permission}D</p>
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p>8:00</p>
                                                        <p>0:00</p>
                                                    </div>
                                                    <div className='timetable'>
                                                        {
                                                            sessions.map((sess, index) => sess.session.hall == hall.id && sess.session.date == date && (
                                                                <div key={index} className='session-object' style={{ width: `${100 / 960 * sess.session.length}%`, left: `${100 / 960 * sess.left}%` }}
                                                                    onClick={(e) => session_clicked(sess.session.id)}
                                                                >
                                                                    <p>{sess.movie_name}</p>
                                                                </div>
                                                            )
                                                            )}
                                                    </div>
                                                    <div className='timeline'>
                                                        {
                                                            sessions.map((sess, index) => sess.session.hall == hall.id && sess.session.date == date && (
                                                                <p style={{ left: `${100 / 960 * sess.left}%` }}>{sess.start_time}</p>
                                                            )
                                                            )}
                                                        {sessions.map((sess, index) => sess.session.hall == hall.id && sess.session.date == date && (
                                                            <p style={{ left: `${100 / 960 * sess.right - 2.7}%` }}>{sess.end_time}</p>
                                                        )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )}
                                </div>
                            )
                            )}
                    </div>
                </div>
                {showToast && <Toast message={toastMsg} onClose={handleCloseToast} cl={toastClass} />}
            </div>
        </div>
    )
}
export default Schedule;