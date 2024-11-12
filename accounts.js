import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Delete from '../images/delete.png';

function Account() {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        loadAccounts();
    }, [])
    const loadAccounts = async () => {
        const accs = await axios.get("http://localhost:8080/account/accounts");
        setAccounts(accs.data);
    }
    return (
        <div>
            <Navbar />
            <div style={{ width: '50%', margin: 'auto' }}>
                <div className="scroll-table" style={{ marginTop: '7em' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>Логин</th>
                                <th style={{ width: '40%' }}>Роль</th>
                                <th style={{ width: '20%' }}>Удалить</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="scroll-table-body">
                        <table>
                            <tbody>
                                {
                                    accounts.map((account, index) => (
                                        <tr>
                                            <td style={{ width: '40%' }}>{account.login}</td>
                                            {account.role==1 &&
                                                <td style={{ width: '40%' }}>Администратор</td>
                                            }
                                            {account.role==0 &&
                                                <td style={{ width: '40%' }}>Сотрудник</td>
                                            }
                                            <td style={{ width: '20%' }}>
                                                <img src={Delete} className='delete-icon' />
                                            </td>
                                        </tr>))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='container' style={{ marginTop: '2em' }}>
                <h3>Добавление сотрудника</h3>
                <label>
                    <input required type="text" className="auth-reg-inp" placeholder="login_1234" />
                    <span>Логин</span>
                </label>
                <label>
                    <input required type="text" className="auth-reg-inp" placeholder="Password0_9" />
                    <span>Пароль</span>
                </label>
                <button className='auth-reg-button' type="submit">Добавить</button>
            </div>
        </div>
    )
}
export default Account;