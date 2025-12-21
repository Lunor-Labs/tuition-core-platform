import './App.css'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './features/landing'
import { TeacherPortal } from './features/teacher-portal'
import { StudentPortal } from './features/student-portal'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher/*" element={<TeacherPortal />} />
      <Route path="/student/*" element={<StudentPortal />} />
    </Routes>
  )
}

export default App
