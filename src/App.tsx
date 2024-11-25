import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CragPage from './pages/CragPage'
import 'leaflet/dist/leaflet.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CragPage />} />
      </Routes>
    </Router>
  )
}

export default App
