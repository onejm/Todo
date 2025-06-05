import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoCalendarPage from './pages/TodoCalendarPage';
import TodoListPage from './pages/TodoListPage';
import TodoCreatePage from './pages/TodoCreatePage';
import TodoDayPage from './pages/TodoDayPage';
import TodoDetailPage from './pages/TodoDetailPage';
import TodoEditPage from './pages/TodoEditPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* 로그인 및 회원가입 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* TODO 관련 */}
                <Route path="/todo" element={<TodoCalendarPage />} />
                <Route path="/todo/list" element={<TodoListPage />} />
                <Route path="/todo/create" element={<TodoCreatePage />} />
                <Route path="/todo/day/:date" element={<TodoDayPage />} />
                <Route path="/todo/edit/:id" element={<TodoEditPage />} />
                <Route path="/todo/:id" element={<TodoDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
