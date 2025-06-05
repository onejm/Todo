import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
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

    // 우선순위별 색상 지정 함수
    const getColorByPriority = (priority) => {
        switch (priority) {
            case 'HIGH': return '#ddb6b2';     // 빨강
            case 'MEDIUM': return '#cdbda8';   // 주황
            case 'LOW': return '#96bfa6';      // 초록
            default: return '#a9c8dc';         // 파랑
        }
    };

    const events = todos.map((todo) => ({
        title: todo.title,
        start: todo.startDate,
        end: todo.endDate,
        allDay: true,
        color: getColorByPriority(todo.priority),
        textColor: '#ffffff'
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
