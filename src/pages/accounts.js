import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Delete from '../images/delete.png';
import Modal from "react-modal";
import Toast from '../components/Toast';

function Account() {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        loadAccounts();
    }, [])
    const loadAccounts = async () => {
        const accs = await axios.get("http://localhost:8080/account/accounts");
        setAccounts(accs.data);
    }
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const add = async (e) => {
        e.preventDefault()
        const account = { login, password }
        console.log(account)
        try {
            const response = await axios.post("http://localhost:8080/account/add",
                account
            )
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    setToastClass("toast err-toast")
                    setToastMsg("Данный логин существует в системе")
                    handleShowToast()
                    break;
                case 1:
                    loadAccounts();
                    setToastClass("toast succ-toast")
                    setToastMsg("Сотрудник был добавлен в систему")
                    handleShowToast()
                    setLogin('');
                    setPassword('');
                    break;
                default:
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const { loginDel } = useParams();
    const deleteAccount = async (loginDel) => {
        console.log("loginDel: ", loginDel)
        try {
            const response = await axios.delete(`http://localhost:8080/account/delete/${loginDel}`)
            let status = response.data;
            console.log("data", status)
            switch (status) {
                case 0:
                    setToastClass("toast err-toast")
                    setToastMsg("Нельзя удалить администратора")
                    handleShowToast()
                    break;
                case 1:
                    loadAccounts();
                    setToastClass("toast succ-toast")
                    setToastMsg("Сотрудник был удален")
                    handleShowToast()
                    break;
                default:
                    setToastClass("toast err-toast")
                    setToastMsg("Возникла ошибка при удалении сотрудника")
                    handleShowToast()
                    console.log("nope");
                    break;
            }
        } catch (err) {
            console.log("error: ")
        }
    }
    const [confirm, setConfirm] = useState('')
    const [acc_login, setAcc_login] = useState('')
    let [showModal, setShowModal] = useState(false)
    function showMod(acc, conf) {
        setConfirm(conf);
        setAcc_login(acc)
        setShowModal(true)
    }
    function closeMod() {
        setConfirm('');
        setAcc_login('')
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
        <div>
            <Navbar />
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}
                className="modal-content">
                <p>{confirm}</p>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className='mod-conf-btn' onClick={() => { setShowModal(false); deleteAccount(acc_login) }}>Да</button>
                    <button className='mod-decl-btn' onClick={() => closeMod()}>Нет</button>
                </div>
            </Modal>
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
                                            {account.role == 1 &&
                                                <td style={{ width: '40%' }}>Администратор</td>
                                            }
                                            {account.role == 0 &&
                                                <td style={{ width: '40%' }}>Сотрудник</td>
                                            }
                                            <td style={{ width: '20%' }}>
                                                <img src={Delete} className='delete-icon'
                                                    onClick={() => showMod(account.login, "Вы уверены, что хотите удалить сотрудника?")} />
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
                <form className='container-form' onSubmit={add}>
                    <label>
                        <input required type="text" className="auth-reg-inp" placeholder="login_1234"
                            value={login} onChange={(e) => setLogin(e.target.value)} />
                        <span>Логин</span>
                    </label>
                    <label>
                        <input required type="text" className="auth-reg-inp" placeholder="Password0_9"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span>Пароль</span>
                    </label>
                    <button className='auth-reg-button' type="submit">Добавить</button>
                </form>
            </div>
            {showToast && <Toast message={toastMsg} onClose={handleCloseToast} cl={toastClass} />}
        </div>
    )
}
export default Account;