<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-64 bg-gray-800 transition-all duration-300 ease-in-out" :class="{ 'w-20': isSidebarCollapsed }">
      <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
        <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-auto" :class="{ 'mx-auto': isSidebarCollapsed }" />
        <button 
          class="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none" 
          :class="{ 'hidden': isSidebarCollapsed }"
          @click="toggleSidebar"
        >
          <span class="material-icons">{{ isSidebarCollapsed ? 'menu' : 'menu_open' }}</span>
        </button>
      </div>
      
      <nav class="mt-5 px-2 space-y-1">
        <router-link 
          to="/dashboard" 
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200"
          :class="[
            $route.path === '/dashboard' 
              ? 'bg-gray-900 text-white' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          ]"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">dashboard</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Dashboard</span>
        </router-link>
        
        <router-link 
          to="/dashboard/sales" 
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">point_of_sale</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Sales</span>
        </router-link>
        
        <router-link 
          to="/dashboard/purchases" 
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">shopping_cart</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Purchases</span>
        </router-link>
        
        <router-link 
          to="/dashboard/items" 
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">inventory</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Items</span>
        </router-link>
        
        <router-link 
          to="/dashboard/reports" 
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">bar_chart</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Reports</span>
        </router-link>
      </nav>
      
      <div class="mt-auto border-t border-gray-700 py-4 px-2">
        <button 
          @click="handleLogout"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white w-full transition-colors duration-200"
        >
          <span class="material-icons mr-3 text-gray-400 group-hover:text-gray-300">logout</span>
          <span :class="{ 'hidden': isSidebarCollapsed }">Logout</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-auto">
      <header class="bg-white shadow">
        <div class="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="material-icons text-gray-500">account_circle</span>
              <span class="text-sm font-medium text-gray-700">{{ username }}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isSidebarCollapsed = ref(false)
const username = computed(() => authStore.user?.email || 'User')

const pageTitle = computed(() => {
  const path = route.path.split('/').pop()
  return path.charAt(0).toUpperCase() + path.slice(1)
})

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
