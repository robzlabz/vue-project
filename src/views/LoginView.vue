<template>
  <div class="login-container">
    <div class="login-form">
      <Card class="login-card">
        <template #title>
          <h2 class="text-center mb-4">Selamat Datang Kembali</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleLogin" class="p-fluid">
            <div class="field mb-4">
              <span class="p-float-label">
                <InputText 
                  id="email" 
                  v-model="email" 
                  :class="{'p-invalid': submitted && !email}"
                />
                <label for="email">Email/Nama Pengguna</label>
              </span>
              <small v-if="submitted && !email" class="p-error">Email/Nama Pengguna diperlukan.</small>
            </div>

            <div class="field mb-4">
              <span class="p-float-label">
                <Password 
                  id="password" 
                  v-model="password" 
                  :feedback="false"
                  toggleMask
                  :class="{'p-invalid': submitted && !password}"
                />
                <label for="password">Kata Sandi</label>
              </span>
              <small v-if="submitted && !password" class="p-error">Kata Sandi diperlukan.</small>
            </div>

            <div class="flex align-items-center justify-content-between mb-4">
              <div class="flex align-items-center">
                <Checkbox v-model="rememberMe" id="rememberMe" :binary="true" />
                <label for="rememberMe" class="ml-2">Ingat saya</label>
              </div>
              <router-link to="/forgot-password" class="no-underline">Lupa kata sandi?</router-link>
            </div>

            <Button type="submit" label="Masuk" class="mb-4 p-button-primary" />
            
            <div class="text-center">
              <span>Belum punya akun? </span>
              <router-link to="register" class="font-bold no-underline">Daftar</router-link>
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const submitted = ref(false)

const handleLogin = async () => {
  submitted.value = true

  if (!email.value || !password.value) {
    return
  }

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })
    router.push('/dashboard')
  } catch (error) {
    console.error('Login gagal:', error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.login-card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.p-fluid {
  width: 100%;
}

.field {
  margin-bottom: 1.5rem;
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

.ml-2 {
  margin-left: 0.5rem;
}

.font-bold {
  font-weight: bold;
}

.no-underline {
  text-decoration: none;
  color: #2196F3;
}

.p-button-primary {
  background-color: #2196F3;
  border-color: #2196F3;
}

.p-button-primary:hover {
  background-color: #1976D2;
  border-color: #1976D2;
}

h2 {
  color: #333333;
}

label {
  color: #555555;
}
</style>
