import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // ✅ 클릭 이벤트 지원
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // 커스텀 axios 인스턴스 사용
import '../styles/calendar.css';

function TodoCalendarPage() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/todo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTodos(res.data);
            } catch (err) {
                console.error('TODO 불러오기 실패:', err);
            }
        };

        fetchTodos();
    }, []);

    const events = todos.map((todo) => ({
        title: todo.title,
        start: todo.startDate,
        end: todo.endDate,
        allDay: true,
    }));

    return (
        <div style={{ maxWidth: 1000, margin: '30px auto' }}>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={(info) => navigate(`/todo/day/${info.dateStr}`)}
            />
        </div>
    );
}

export default TodoCalendarPage;
