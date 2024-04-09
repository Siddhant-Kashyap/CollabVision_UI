import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage';
import Register from './components/Pages/Register';
import Dashboard from './components/Pages/Dashboard';
import VideoLobby from './components/VideoCall/VideoLobby';
import VideoRoom from './components/VideoCall/VideoRoom';
import Features from './components/FeaturesAndAbout/Features';
import About from './components/FeaturesAndAbout/About';


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/videolobby" element={<VideoLobby/>}/>
      <Route path="/room/:roomId" element={<VideoRoom/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="about" element={<About/>}/>
      </Routes>
      
    </Router>
    
    </>
  )
}

export default App
