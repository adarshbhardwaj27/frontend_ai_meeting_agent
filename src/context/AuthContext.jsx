import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)  // true while checking session on mount

  // Restore session from httpOnly cookie on page load
  useEffect(() => {
    api.me()
      .then(({ user, company }) => { setUser(user); setCompany(company) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password)  // throws on 401
    setUser(data.user)
    setCompany(data.company)
  }, [])

  const logout = useCallback(async () => {
    await api.logout().catch(() => {})
    setUser(null)
    setCompany(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, company, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
