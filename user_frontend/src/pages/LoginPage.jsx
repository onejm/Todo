import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/theme.css';
import '../styles/login.css';

function LoginPage() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', {
                username: form.username,
                password: form.password
            });
            localStorage.setItem('token', res.data);
            navigate('/todo');
        } catch (err) {
            const msg = err.response?.data?.error || '로그인 실패';
            setError(msg);
        }
    };

    return (
        <div className="login-container">
            <div className="login-title">로그인</div>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="아이디"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    required
                    onChange={handleChange}
                />
                <button className="login-submit" type="submit">
                    로그인
                </button>
                {error && <p className="form-error">{error}</p>}
            </form>
            <div className="login-bottom">
                아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
            </div>
        </div>
    );
}

export default LoginPage;
