import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import 'leaflet/dist/leaflet.css'
import CragsPage from './pages/CragsPage'
import LandingPage from './pages/LandingPage'
import CreateCragPage from './pages/CreateCragPage'
import CragPage from './pages/CragPage'
import BoulderPage from './pages/BoulderPage'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/crags' element={<CragsPage />} />
        <Route path='/crag/:id' element={<CragPage />} />
        <Route path='/create-crag' element={<CreateCragPage />} />

        <Route path='/boulder/:id' element={<BoulderPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
