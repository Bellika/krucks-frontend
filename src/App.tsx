import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CragList from './components/CragList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CragList />} />
      </Routes>
    </Router>
  )
}

export default App
