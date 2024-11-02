import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./pages/authorization";
import MainPage from "./pages/mainpage"
import Films from "./pages/films"
import Halls from "./pages/halls"
import GetFilm from './pages/get_film'
import Schedule from './pages/schedule'
import Account from './pages/accounts'

function Nav(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/"
                        element={<App/>}>
                    </Route>
                    <Route path="/mainpage"
                        element={<MainPage/>}>
                    </Route>
                    <Route path="/films"
                        element={<Films/>}>
                    </Route>
                    <Route path="/halls"
                        element={<Halls/>}>
                    </Route>
                    <Route path="/get_film"
                        element={<GetFilm/>}>
                    </Route>
                    <Route path="/schedule"
                        element={<Schedule/>}>
                    </Route>
                    <Route path="/accounts"
                        element={<Account/>}>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}
export default Nav;