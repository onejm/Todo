import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/day.css';

function TodoDayPage() {
    const { date } = useParams();
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get(`/api/todos/date/${date}`);
                setTodos(res.data);
            } catch (err) {
                console.error('데이터 불러오기 실패', err);
            }
        };
        fetchTodos();
    }, [date]);

    const handleClick = (id) => {
        navigate(`/todo/detail/${id}`);
    };

    return (
        <div className="day-container">
            <h2>{date}의 할 일 목록</h2>
            {todos.length === 0 ? (
                <p>할 일이 없습니다.</p>
            ) : (
                <ul className="day-todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} onClick={() => handleClick(todo.id)} className="clickable-todo">
                            {todo.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoDayPage;
