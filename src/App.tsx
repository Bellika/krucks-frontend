import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import CragPage from './pages/CragPage'
import LandingPage from './pages/LandingPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/crags' element={<CragPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
