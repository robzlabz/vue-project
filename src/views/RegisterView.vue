<template>
  <div class="register-container">
    <div class="register-form">
      <Card class="register-card">
        <template #title>
          <h2 class="text-center mb-4">Create Account</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleRegister" class="p-fluid">
            <div class="field mb-4">
              <span class="p-float-label">
                <InputText 
                  id="name" 
                  v-model="name" 
                  :class="{'p-invalid': submitted && !name}"
                />
                <label for="name">Full Name</label>
              </span>
              <small v-if="submitted && !name" class="p-error">Name is required.</small>
            </div>

            <div class="field mb-4">
              <span class="p-float-label">
                <InputText 
                  id="username" 
                  v-model="username" 
                  :class="{'p-invalid': submitted && !username}"
                />
                <label for="username">Username</label>
              </span>
              <small v-if="submitted && !username" class="p-error">Username is required.</small>
            </div>

            <div class="field mb-4">
              <span class="p-float-label">
                <InputText 
                  id="email" 
                  type="email"
                  v-model="email" 
                  :class="{'p-invalid': submitted && !email}"
                />
                <label for="email">Email</label>
              </span>
              <small v-if="submitted && !email" class="p-error">Email is required.</small>
            </div>

            <div class="field mb-4">
              <span class="p-float-label">
                <Password 
                  id="password" 
                  v-model="password" 
                  :toggleMask="true"
                  :class="{'p-invalid': submitted && !password}"
                />
                <label for="password">Password</label>
              </span>
              <small v-if="submitted && !password" class="p-error">Password is required.</small>
            </div>

            <div class="field mb-4">
              <span class="p-float-label">
                <Password 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  :toggleMask="true"
                  :feedback="false"
                  :class="{'p-invalid': submitted && !confirmPassword}"
                />
                <label for="confirmPassword">Confirm Password</label>
              </span>
              <small v-if="submitted && !confirmPassword" class="p-error">Password confirmation is required.</small>
              <small v-if="submitted && confirmPassword && password !== confirmPassword" class="p-error">Passwords do not match.</small>
            </div>

            <Button type="submit" label="Sign Up" class="mb-4" />
            
            <div class="text-center">
              <span>Already have an account? </span>
              <router-link to="/login" class="font-bold no-underline">Sign in</router-link>
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

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--surface-ground);
}

.register-form {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

.register-card {
  background-color: var(--surface-card);
  border-radius: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
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

.font-bold {
  font-weight: bold;
}

.no-underline {
  text-decoration: none;
}
</style>
