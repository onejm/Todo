import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/theme.css';
import '../styles/signup.css';

function SignupPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post('/auth/signup', {
                username: form.username,
                email: form.email,
                phone: form.phone,
                password: form.password
            });
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.error || '서버 오류';
            setMessage('회원가입 실패: ' + msg);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-title">회원가입</div>
            <form className="signup-form" onSubmit={handleSignup}>
                <input name="username" type="text" placeholder="아이디" required onChange={handleChange} />
                <input name="email" type="email" placeholder="이메일" required onChange={handleChange} />
                <input name="phone" type="text" placeholder="전화번호 (010XXXXXXXX)" required onChange={handleChange} />
                <input name="password" type="password" placeholder="비밀번호" required onChange={handleChange} />
                <input name="confirmPassword" type="password" placeholder="비밀번호 확인" required onChange={handleChange} />
                <button className="signup-submit">가입하기</button>
                {message && <p className="form-error">{message}</p>}
            </form>
            <div className="signup-bottom">
                이미 계정이 있으신가요? <a href="/login">로그인</a>
            </div>
        </div>
    );
}

export default SignupPage;
