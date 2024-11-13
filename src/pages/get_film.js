import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import test from "../images/test_photo.png"
import SearchImg from '../images/search_button.png';

function GetFilm() {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [movTitle, setMovTitle] = useState('')
    const [genres, setGenres] = useState('')
    const [age, setAge] = useState('')
    const [poster, setPoster] = useState('')
    const [length, setLength] = useState('')
    const [display,setDisplay] = useState('none') 
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
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    let movie = status.movie
                    setId(movie.id)
                    setMovTitle(movie.name)
                    setAge(movie.ageRating)
                    setGenres(status.genres)
                    setLength(movie.movieLength)
                    setPoster(movie.poster)
                    setDisplay('flex')
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const [permission, setPermission] = useState('')
    const [rent, setRent] = useState('')
    return (
        <div>
            <Navbar />
            <div style={{ width: '67%', margin: 'auto', marginTop: '7em', height: '40px', display: 'flex', justifyContent: 'end' }}>
                <form onSubmit={get_info}>
                    <div className='search' style={{ width: "100%" }}>
                        <input className='search-input' required placeholder='Введите название фильма'
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        <button style={{ width: "12%" }} className='search-button'>
                            <img src={SearchImg} alt='Search' style={{ width: '40%' }}></img>
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ width: '67%', margin: 'auto', marginTop: '2em' }}>
                <form>
                    <div className='name-board' style={{ display: display }}>
                        <div style={{ width: '35%' }}>
                            <img src={poster} alt="no image" style={{ width: '100%', height: '400px' }} />
                        </div>
                        <div style={{ width: '60%', gap: '15px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                            <h3 style={{ marginBottom: '10px' }}>{movTitle}</h3>
                            <p>Жанры: {genres}</p>
                            <p>Возрастное ограничение: {age}+</p>
                            <p>Продолжительность фильма: {length} минут</p>
                            <table style={{ width: '70%', marginTop: '-6px' }}>
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
                                        <input type='number' min="0" required className='auth-reg-inp' placeholder='Срок проката'></input>
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
        </div>
    )
}
export default GetFilm;