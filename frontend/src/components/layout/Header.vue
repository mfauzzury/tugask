<script setup lang="ts">
import { useTaskModal } from '../../composables/useTaskModal';

const { openModal } = useTaskModal();
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
    </div>
  </header>
</template>
