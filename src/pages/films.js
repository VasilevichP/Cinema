import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchImg from '../images/search_button.png';
import test from "../images/test_photo.png"

function Films() {
    const [movies, setMovies] = useState([]);
    const [dist_genres, setDist_genres] = useState([]);
    useEffect(() => {
        loadMovies();
    }, [])
    const loadMovies = async () => {
        const ms = await axios.get("http://localhost:8080/movie/movies");
        setDist_genres(ms.data.dist_genres)
        setMovies(ms.data.movies)
    }
    const [filt_genre, setFilt_genre] = useState('')
    const [filt_rent, setFilt_rent] = useState('0')
    const [search, setSearch] = useState('')
    function handleGenChange(event) {
        setFilt_genre(event.target.value);
    }
    function handleRentChange(event) {
        setFilt_rent(event.target.value);
    }
    const filter = async (e) => {
        console.log("in filter: ", filt_genre, search, filt_rent,)
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/movie/sort", null, {
                params: {
                    genre: filt_genre,
                    sort: filt_rent,
                    search: search
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
                    setMovies(status.movies)
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    return (
        <div>
            <Navbar />
            <form onSubmit={filter}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '80%', marginTop: '7em', height: '2.5em' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <select className='filter-select' value={filt_genre} onChange={(e) => { handleGenChange(e) }}>
                            <option value=''>Все жанры</option>
                            {
                                dist_genres.map((dist_genre, index) => (
                                    <option value={dist_genre}>{dist_genre}</option>
                                )
                                )}
                        </select>
                        <select className='filter-select' value={filt_rent} onChange={(e) => { handleRentChange(e); }}>
                            <option value='0'>Без сортировки</option>
                            <option value='1'>От старых к новым</option>
                            <option value='2'>От новых к старым</option>
                        </select>
                        <div className='search'>
                            <input className='search-input' placeholder='Введите название фильма'
                                value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className="filter-button" type='submit'>Применить фильтры</button>
                    </div>
                </div>
            </form>
            <div style={{ margin: 'auto', width: '80%', marginTop: '2em' }}>
                {
                    movies.map((mov, index) => (
                        <div className='name-board'>
                            <div style={{ width: '20%' }}>
                                <img src={mov.movie.poster} alt="no image" style={{ width: '100%', height: '300px' }} />
                            </div>
                            <div style={{ width: '60%', gap: '5px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                                <h3 style={{ marginBottom: '15px' }}>{mov.movie.name}</h3>
                                <p>Жанры: {mov.genres}</p>
                                <p>Возрастное ограничение: {mov.movie.ageRating}+</p>
                                <p>Продолжительность фильма: {mov.movie.movieLength} минут</p>
                                <p>Срок возврата: {mov.movie.date_of_return}</p>
                            </div>
                        </div>
                    )
                    )}
            </div>
        </div>
    )
}
export default Films;