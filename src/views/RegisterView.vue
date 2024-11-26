<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <Card class="bg-white shadow-lg rounded-lg">
        <template #title>
          <h2 class="text-center text-2xl font-bold text-gray-900 mb-4">Create Account</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <span class="relative">
                <InputText 
                  id="name" 
                  v-model="name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': submitted && !name}"
                  placeholder="Full Name"
                />
              </span>
              <small v-if="submitted && !name" class="text-red-500 text-sm mt-1">Name is required.</small>
            </div>

            <div>
              <span class="relative">
                <InputText 
                  id="username" 
                  v-model="username" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': submitted && !username}"
                  placeholder="Username"
                />
              </span>
              <small v-if="submitted && !username" class="text-red-500 text-sm mt-1">Username is required.</small>
            </div>

            <div>
              <span class="relative">
                <InputText 
                  id="email" 
                  type="email"
                  v-model="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{'border-red-500': submitted && !email}"
                  placeholder="Email"
                />
              </span>
              <small v-if="submitted && !email" class="text-red-500 text-sm mt-1">Email is required.</small>
            </div>

            <div>
              <span class="relative">
                <Password 
                  id="password" 
                  v-model="password" 
                  :toggleMask="true"
                  class="w-full"
                  :class="{'p-invalid': submitted && !password}"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </span>
              <small v-if="submitted && !password" class="text-red-500 text-sm mt-1">Password is required.</small>
            </div>

            <div>
              <span class="relative">
                <Password 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  :toggleMask="true"
                  :feedback="false"
                  class="w-full"
                  :class="{'p-invalid': submitted && !confirmPassword}"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                />
              </span>
              <small v-if="submitted && !confirmPassword" class="text-red-500 text-sm mt-1">Password confirmation is required.</small>
              <small v-if="submitted && confirmPassword && password !== confirmPassword" class="text-red-500 text-sm mt-1">Passwords do not match.</small>
            </div>

            <Button type="submit" label="Sign Up" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200" />
            
            <div class="text-center text-sm">
              <span class="text-gray-600">Already have an account? </span>
              <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-800">Sign in</router-link>
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
import Button from 'primevue/button'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const submitted = ref(false)

const handleRegister = async () => {
  submitted.value = true

  if (!name.value || !username.value || !email.value || !password.value || !confirmPassword.value) {
    return
  }

  if (password.value !== confirmPassword.value) {
    return
  }

  try {
    await authStore.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>
