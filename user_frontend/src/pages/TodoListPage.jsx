import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/list.css';

function TodoListPage() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('/api/todo')
            .then((res) => setTodos(res.data))
            .catch((err) => console.error('불러오기 실패', err));
    }, []);

    return (
        <div className="todo-list-page">
            <h2>전체 TODO 목록</h2>
            <div className="todo-list-container">
                {todos.length === 0 ? (
                    <p>할 일이 없습니다.</p>
                ) : (
                    todos.map((todo) => (
                        <Link to={`/todo/${todo.id}`} key={todo.id} className="todo-card">
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <div className="meta">
                                <span>우선순위: {todo.priority}</span>
                                <span>진행도: {todo.status}</span>
                                <span>시작: {todo.startDate}</span>
                                <span>종료: {todo.endDate}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoListPage;
