<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <Card class="bg-white shadow-lg rounded-lg">
        <template #title>
          <h2 class="text-center text-2xl font-bold text-gray-900 mb-4">Selamat Datang Kembali</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <span class="relative">
                <InputText 
                  id="email" 
                  v-model="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': submitted && !email}"
                  placeholder="Email/Nama Pengguna"
                />
              </span>
              <small v-if="submitted && !email" class="text-red-500 text-sm mt-1">Email/Nama Pengguna diperlukan.</small>
            </div>

            <div>
              <span class="relative">
                <Password 
                  id="password" 
                  v-model="password" 
                  :feedback="false"
                  toggleMask
                  class="w-full"
                  :class="{'p-invalid': submitted && !password}"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Kata Sandi"
                />
              </span>
              <small v-if="submitted && !password" class="text-red-500 text-sm mt-1">Kata Sandi diperlukan.</small>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Checkbox v-model="rememberMe" id="rememberMe" :binary="true" class="mr-2" />
                <label for="rememberMe" class="text-sm text-gray-600">Ingat saya</label>
              </div>
              <router-link to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">Lupa kata sandi?</router-link>
            </div>

            <Button type="submit" label="Masuk" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200" />
            
            <div class="text-center text-sm">
              <span class="text-gray-600">Belum punya akun? </span>
              <router-link to="register" class="font-medium text-blue-600 hover:text-blue-800">Daftar</router-link>
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
