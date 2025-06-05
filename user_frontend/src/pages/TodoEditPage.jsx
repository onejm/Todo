import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/edit.css';

function TodoEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: '',
        tags: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    useEffect(() => {
        axios.get(`/api/todo/${id}`)
            .then(res => setForm(res.data))
            .catch(err => alert('불러오기 실패: ' + err.message));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/todo/${id}`, form)
            .then(() => {
                alert('수정 완료');
                navigate(`/todo/${id}`);
            })
            .catch(err => {
                alert('수정 실패: ' + (err.response?.data?.error || '서버 오류'));
            });
    };

    return (
        <div className="todo-edit-container">
            <h2>TODO 수정</h2>
            <form className="todo-edit-form" onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} required />
                <textarea name="description" value={form.description} onChange={handleChange} />
                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="">우선순위 선택</option>
                    <option value="HIGH">높음</option>
                    <option value="MEDIUM">중간</option>
                    <option value="LOW">낮음</option>
                </select>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="쉼표로 구분" />
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="">진행도 선택</option>
                    <option value="READY">대기</option>
                    <option value="IN_PROGRESS">진행중</option>
                    <option value="COMPLETED">완료</option>
                </select>
                <button type="submit">수정</button>
            </form>
        </div>
    );
}

export default TodoEditPage;
