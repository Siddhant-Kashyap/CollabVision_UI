import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage';
import Register from './components/Pages/Register';
import Dashboard from './components/Pages/Dashboard';
import VideoLobby from './components/VideoCall/VideoLobby';
import VideoRoom from './components/VideoCall/VideoRoom';

import About from './components/FeaturesAndAbout/About';
import Features from './components/FeaturesAndAbout/Features';
import ErrorPage from './components/ErrorPage/ErrorPage';


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
      <Route path="/feature" element={<Features/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
      
    </Router>
    
    </>
  )
}

export default App
