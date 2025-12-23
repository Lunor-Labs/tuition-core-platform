import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateLesson from './pages/CreateLesson';
import Lessons from './pages/Lessons';
import Tests from './pages/Tests';
import Settings from './pages/Settings';

const TeacherPortal: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-lesson" element={<CreateLesson />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="tests" element={<Tests />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default TeacherPortal;

