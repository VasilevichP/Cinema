import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchImg from '../images/search_button.png';
import Toast from '../components/Toast';

function GetFilm() {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [genres, setGenres] = useState('')
    const [ageRating, setAgeRating] = useState('')
    const [poster, setPoster] = useState('')
    const [movieLength, setMovieLength] = useState('')
    const [display, setDisplay] = useState('none')
    const get_info = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/movie/get_movie_info",
                title, {
                headers: {
                    'Content-Type': 'text/plain',
                }
            }
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 1:
                    setToastClass("toast err-toast")
                    setToastMsg("Фильм не найден")
                    handleShowToast()
                    break;
                case 2:
                    setToastClass("toast err-toast")
                    setToastMsg("Данный фильм не предназначен для просмотра в кинотеатре")
                    handleShowToast()
                    break;
                case 3:
                    setToastClass("toast err-toast")
                    setToastMsg("Данный фильм уже есть в базе данных кинотеатра")
                    handleShowToast()
                    break;
                default:
                    setId(status.id)
                    setName(status.name)
                    setAgeRating(status.ageRating)
                    setGenres(status.genres)
                    setMovieLength(status.movieLength)
                    setPoster(status.poster)
                    setDisplay('flex')
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const [permission, setPermission] = useState('2')
    function handleChange(event) {
        setPermission(event.target.value);
    }
    const [rent, setRent] = useState('')
    const add = async (e) => {
        e.preventDefault()
        const movie = { id, name, permission, poster, movieLength, ageRating, rent, genres }
        try {
            const response = await axios.post("http://localhost:8080/movie/add",
                movie
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    setId('')
                    setName('')
                    setAgeRating('')
                    setGenres('')
                    setMovieLength('')
                    setPoster('')
                    setDisplay('none')
                    setPermission('2')
                    setRent('')
                    setToastClass("toast succ-toast")
                    setToastMsg("Фильм был добавлен в базу данных")
                    handleShowToast()
                    break;
                case 1:
                    setToastClass("toast err-toast")
                    setToastMsg("Возникла ошибка при добавлении фильма")
                    handleShowToast()
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
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
        <div>
            <Navbar />
            <div style={{ width: '67%', margin: 'auto', marginTop: '7em', height: '40px', display: 'flex', justifyContent: 'end' }}>
                <form onSubmit={get_info}>
                    <div className='search' style={{ width: "100%", display: 'flex', alignItems: 'stretch' }}>
                        <input className='search-input-film' required placeholder='Введите название фильма'
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        <button style={{ width: "12%" }} className='search-button'>
                            <img src={SearchImg} alt='Search' style={{ width: '40%' }}></img>
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ width: '67%', margin: 'auto', marginTop: '2em' }}>
                <form onSubmit={add}>
                    <div className='name-board' style={{ display: display }}>
                        <div style={{ width: '35%' }}>
                            <img src={poster} alt="no image" style={{ width: '100%', height: '400px' }} />
                        </div>
                        <div style={{ width: '60%', gap: '15px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                            <h3 style={{ marginBottom: '10px' }}>{name}</h3>
                            <p>Жанры: {genres}</p>
                            <p>Возрастное ограничение: {ageRating}+</p>
                            <p>Продолжительность фильма: {movieLength} минут</p>
                            <table style={{ width: '70%', marginTop: '-6px' }}>
                                <tr>
                                    <td>Разрешение фильма</td>
                                    <td>
                                        <select className='choose-select' value={permission} onChange={handleChange}>
                                            <option value='2'>2D</option>
                                            <option value='3'>3D</option>
                                            <option value='5'>5D</option>
                                            <option value='7'>7D</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Срок возврата</td>
                                    <td>
                                        <input type='number' min="0" required className='auth-reg-inp' placeholder='Срок проката'
                                            value={rent} onChange={(e) => setRent(e.target.value)}></input>
                                    </td>
                                </tr>

                            </table>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'end', height: '100%', alignItems: 'end' }}>
                                <button className="auth-reg-button" style={{ width: 'auto', padding: '15px 20px' }}>Добавить</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showToast && <Toast message={toastMsg} onClose={handleCloseToast} cl={toastClass} />}
        </div>
    )
}
export default GetFilm;