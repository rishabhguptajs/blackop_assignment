import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Posts from './pages/Post'
import ResetPasswordForm from './pages/ResetPasswordForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path='/reset-password' element={<ResetPasswordForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
