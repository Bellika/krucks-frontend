import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from "../api/axiosInstance";

interface User {
  firstName: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/me', { withCredentials: true })
        setUser(res.data.user)
      } catch (error) {
        console.error(error)
        setUser(null)
      }
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', { email, password }, { withCredentials: true })
    setUser(res.data.user)
  }

  const logout = async () => {
    await axiosInstance.post('/auth/logout', {}, { withCredentials: true })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
