import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/create.css';

function TodoCreatePage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: '',
        tags: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/todo', form);
            alert('TODO가 등록되었습니다.');
            navigate('/todo/list');
        } catch (err) {
            alert('등록 실패: ' + (err.response?.data?.error || '서버 오류'));
        }
    };

    return (
        <div className="todo-create-container">
            <h2>TODO 등록</h2>
            <form className="todo-create-form" onSubmit={handleSubmit}>
                <input name="title" placeholder="제목" required onChange={handleChange} />
                <textarea name="description" placeholder="상세 내용" onChange={handleChange} />
                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="">우선순위 선택</option>
                    <option value="HIGH">높음</option>
                    <option value="MEDIUM">중간</option>
                    <option value="LOW">낮음</option>
                </select>

                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="">진행 상태 선택</option>
                    <option value="READY">대기</option>
                    <option value="IN_PROGRESS">진행중</option>
                    <option value="COMPLETED">완료</option>
                </select>

                <input name="tags" placeholder="태그 (쉼표로 구분)" onChange={handleChange} />
                <input type="date" name="startDate" onChange={handleChange} />
                <input type="date" name="endDate" onChange={handleChange} />

                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default TodoCreatePage;