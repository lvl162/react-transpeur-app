import React, { useState } from 'react';
import './login-register.scss';
import CallApi from '../../../util/callApi';
import * as Mess from "./../../../constants/Message";
import { useHistory } from 'react-router';
import { onLogin } from './../../../reducers/login-register';
import { useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

function RegisterForm(props) {

    const alert = useAlert();

    const dispatch = useDispatch();

    const history = useHistory();

    const [mess, setMess] = useState(Mess.LOGIN_FAIL_INFO);

    const [check, setCheck] = useState(true);

    const [account, setAccount] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const HandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setAccount({
            ...account, [name]: value
        })
    }

    const CheckSignUp = () => {
        if (account.email.search("@gmail.com") === -1 || account.email === "") {
            setCheck(false);
            setLoading(false);
            setMess(Mess.SIGNUP_FAIL_EMAIL);
        }
        if (account.name === "") {
            setCheck(false);
            setLoading(false);
            setMess(Mess.SIGNUP_FAIL_NAME);
        }
        if (account.username === "" || account.username.length < 8) {
            setCheck(false);
            setLoading(false);
            setMess(Mess.SIGNUP_FAIL_USER);
        }
        if (account.password === "" || account.username.length < 8) {
            setCheck(false);
            setLoading(false);
            setMess(Mess.SIGNUP_FAIL_PASS);
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        CheckSignUp();
        if (check) {
            const ac = new AbortController();
            CallApi('api/auth/signup', 'POST', {
                'username': account.username,
                'password': account.password,
                'name': account.name,
                'email': account.email
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        setCheck(true);
                        setLoading(false);
                        alert.success('Tạo tài khoản thành công !');
                        dispatch(onLogin());
                        history.push('/login');
                        setAccount({
                            name: "",
                            username: "",
                            email: "",
                            password: ""
                        })
                    } else {
                        setMess(res.data.message);
                        setCheck(false);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setCheck(false);
                    setLoading(false);
                    setMess(Mess.SIGNUP_FAIL_USER);
                });
            return ac.abort();
        } else {
            setCheck(false);
            setLoading(false);
            setMess(Mess.SIGNUP_FAIL_USER);
        }
    }
    return (
        <div className="flex items-center justify-center w-1/2">
            <div className="w-7/12">
                <div className="flex items-center">
                    <div className="bg-logo bg-no-repeat bg-cover w-32 h-32 cursor-pointer"></div>
                    <h1 className="px-3 text-xl font-medium">TRANSPER</h1>
                </div>
                <div className="pl-3 mt-20">
                    <h1 className="text-3xl font-semibold mb-1">Đăng ký</h1>
                    <p className="opacity-50 font-medium">Tạo một tài khoản miễn phí và tận hưởng nó</p>
                </div>
                <form action="" method="post" className="pl-3 mt-14">
                    <div className="animate-fade-in-up-0 border-b border-gray-200 flex items-center justify-between rounded py-1 input">
                        <input type="text" placeholder="Tên" value={account.name} onChange={HandleChange} className="pl-2 w-full mr-2 py-1" name="name" />
                        <i className="fas fa-signature opacity-50 mr-1"></i>
                    </div>
                    <div className="animate-fade-in-up-1 border-b border-gray-200 flex items-center justify-between rounded py-1 input mt-4">
                        <input type="text" placeholder="Địa chỉ email" value={account.email} onChange={HandleChange} className="pl-2 w-full mr-2 py-1" name="email" />
                        <i className="far fa-envelope opacity-50 mr-2"></i>
                    </div>
                    <div className="animate-fade-in-up-1 border-b border-gray-200 flex items-center justify-between rounded py-1 input mt-4">
                        <input type="text" placeholder="Tên đăng nhập" value={account.username} onChange={HandleChange} className="pl-2 w-full mr-2 py-1" name="username" />
                        <i className="far fa-user opacity-50 mr-2"></i>
                    </div>
                    <div className="animate-fade-in-up-2 border-b border-gray-200 flex items-center justify-between rounded py-1 mt-4 input">
                        <input type="password" placeholder="Mật khẩu" value={account.password} onChange={HandleChange} className="pl-2 w-full mr-2 py-1" name="password" />
                        <i className="fas fa-lock opacity-50 mr-2"></i>
                    </div>
                    {!check && (
                        <p className="text-sm text-red-600 ml-1 mt-2 italic">{mess}</p>
                    )}
                    <button
                        type="submit"
                        onClick={HandleSubmit}
                        className="duration-300 animate-fade-in-up-3 text-xl flex items-center cursor-pointer py-3 px-10 rounded login-register-btn text-white font-medium hover:opacity-70 transition duration-700 mt-8"
                    >
                        <span>Tạo tài khoản</span>
                        {loading && (
                            <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 ml-3"></div>
                        )}
                    </button>
                    <div className="mt-10 flex items-center justify-center">
                        <div className="cursor-pointer animate-fade-in-up-icon-1 mx-1 border border-blue-800 p-3 rounded-full bg-blue-800 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-800 transition duration-500">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-2 mx-1 border border-blue-400 p-3 rounded-full bg-blue-400 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-400 transition duration-500">
                            <i className="fab fa-twitter"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-3 mx-1   border border-red-600 p-3 rounded-full bg-red-600 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition duration-500">
                            <i className="fab fa-google-plus-g"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-4 mx-1 border border-blue-600 p-3 rounded-full bg-blue-600 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition duration-500">
                            <i className="fab fa-linkedin-in"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-5 mx-1 border border-red-700 p-3 rounded-full bg-red-700 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-red-700 transition duration-500">
                            <i className="fab fa-pinterest-p"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;