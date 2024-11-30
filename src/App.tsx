import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import 'leaflet/dist/leaflet.css'
import CragPage from './pages/CragPage'
import LandingPage from './pages/LandingPage'
import CreateCragPage from './pages/CreateCragPage'
import CragDetailsPage from './pages/CragDetailsPage'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/crags' element={<CragPage />} />
        <Route path='/crag/:id' element={<CragDetailsPage />} />
        <Route path='/create-crag' element={<CreateCragPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
