<template>
  <div class="dashboard-container">
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <button class="collapse-btn" @click="toggleSidebar">
          <span class="material-icons">{{ isSidebarCollapsed ? 'menu' : 'menu_open' }}</span>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
          <span class="material-icons">dashboard</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Dashboard</span>
        </router-link>
        
        <router-link to="/dashboard/sales" class="nav-item">
          <span class="material-icons">point_of_sale</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Sales</span>
        </router-link>
        
        <router-link to="/dashboard/purchases" class="nav-item">
          <span class="material-icons">shopping_cart</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Purchases</span>
        </router-link>
        
        <router-link to="/dashboard/items" class="nav-item">
          <span class="material-icons">inventory</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Items</span>
        </router-link>
        
        <router-link to="/dashboard/reports" class="nav-item">
          <span class="material-icons">bar_chart</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Reports</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <div class="nav-item" @click="handleLogout">
          <span class="material-icons">logout</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Logout</span>
        </div>
      </div>
    </aside>

    <main class="main-content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <header class="dashboard-header">
        <div class="header-title">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-actions">
          <div class="user-profile">
            <span class="material-icons">account_circle</span>
            <span class="username">{{ username }}</span>
          </div>
        </div>
      </header>
      
      <div class="content">
        <router-view></router-view>
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

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.sidebar-collapsed {
  width: 64px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 32px;
  height: 32px;
}

.collapse-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item .material-icons {
  margin-right: 1rem;
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  background-color: #f5f5f5;
  width: calc(100% - 250px);
}

.content-expanded {
  margin-left: 70px;
  width: calc(100% - 70px);
}

.dashboard-header {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.content {
  padding: 2rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    z-index: 1000;
  }
  
  .sidebar-collapsed {
    transform: translateX(-100%);
  }
  
  .main-content {
    margin-left: 0 !important;
  }
}
</style>
