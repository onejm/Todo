import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/detail.css';

function TodoDetailPage() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/todo/${id}`)
            .then((res) => setTodo(res.data))
            .catch((err) => console.error('불러오기 실패', err));
    }, [id]);

    if (!todo) return <div className="todo-detail-page">로딩 중...</div>;

    return (
        <div className="todo-detail-page">
            <div className="todo-detail-card">
                <h2>{todo.title}</h2>
                <div className="info-box">
                    <strong>상세 내용</strong>
                    <p>{todo.description}</p>
                </div>
                <div className="info-box">
                    <strong>우선순위</strong>
                    <span>{todo.priority}</span>
                </div>
                <div className="info-box">
                    <strong>진행도</strong>
                    <span>{todo.status}</span>
                </div>
                <div className="info-box">
                    <strong>시작일</strong>
                    <span>{todo.startDate}</span>
                </div>
                <div className="info-box">
                    <strong>종료일</strong>
                    <span>{todo.endDate}</span>
                </div>
                <div className="info-box">
                    <strong>태그</strong>
                    <span>{todo.tags}</span>
                </div>

                <div className="detail-buttons">
                    <button className="edit-btn" onClick={() => navigate(`/todo/edit/${todo.id}`)}>수정</button>
                    <button className="back-btn" onClick={() => navigate('/todo/list')}>목록으로</button>
                </div>
            </div>
        </div>
    );
}

export default TodoDetailPage;
