import React from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'


const LandingPage: React.FC = () => {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>Landing Page</h1>
      {user ? (
        <h2>Welcome, {user.firstName}!</h2>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default LandingPage