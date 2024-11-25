import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const login = async ({ email, password }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      user.value = data.user
      token.value = data.token
      localStorage.setItem('token', data.token)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async ({ name, username, email, password }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      return data
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
