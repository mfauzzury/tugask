<script setup lang="ts">
import { ref } from 'vue';
import { useTaskModal } from '../../composables/useTaskModal';
import { useAuth } from '../../composables/useAuth';

const { openModal } = useTaskModal();
const { currentUser, logout } = useAuth();
const showUserMenu = ref(false);
</script>

<template>
  <header class="h-16 flex items-center justify-between px-6 bg-surface border-b border-gray-200 sticky top-0 z-10">
    <div class="flex items-center gap-3">
      <!-- Mobile Menu Button (Visible on mobile) -->
      <button class="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
         <span class="text-white font-bold text-lg">T</span>
      </div>
      <h1 class="text-xl font-bold text-primary tracking-tight hidden sm:block">Tugask</h1>
    </div>
    
    <div class="flex items-center gap-4">
      <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button @click="openModal" class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
        + New Task
      </button>

      <!-- User Menu -->
      <div class="relative">
        <button
          @click="showUserMenu = !showUserMenu"
          class="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
        >
          <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span class="text-xs font-bold text-gray-700">{{ currentUser?.name?.charAt(0).toUpperCase() }}</span>
          </div>
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showUserMenu"
          @click="showUserMenu = false"
          class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <div class="px-4 py-2 border-b border-gray-200">
            <p class="text-sm font-medium text-gray-900">{{ currentUser?.name }}</p>
            <p class="text-xs text-gray-500">{{ currentUser?.email }}</p>
          </div>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
