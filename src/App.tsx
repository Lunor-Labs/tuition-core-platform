import './App.css'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './features/landing'
import { TeacherPortal } from './features/portals/teacher'
import LoginPage from './features/landing/pages/LoginPage'
import RegisterPage from './features/landing/pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/teacher/*" element={<TeacherPortal />} />
    </Routes>
  )
}

export default App
