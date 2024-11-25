import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const login = async ({ email, password }) => {
    try {
      // Mock login - accept any credentials
      const mockUser = {
        email,
        name: 'Test User',
        id: 1
      }
      const mockToken = 'mock-jwt-token'

      user.value = mockUser
      token.value = mockToken
      localStorage.setItem('token', mockToken)
      return { user: mockUser, token: mockToken }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async ({ name, username, email, password }) => {
    try {
      // Mock registration - accept any input
      const mockUser = {
        email,
        name,
        username,
        id: 1
      }
      return mockUser
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  const isAuthenticated = () => !!token.value

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
  }
})
