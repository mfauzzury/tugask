<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Projects', path: '/projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { name: 'Tasks', path: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { name: 'Timeline', path: '/timeline', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Users', path: '/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Settings', path: '#', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

const activeItem = computed(() => {
  return menuItems.find(item => item.path === route.path)?.name || 'Tasks';
});
</script>

<template>
  <aside class="w-56 bg-surface border-r border-gray-200 hidden md:flex flex-col h-full">
    <div class="p-4">
       <h2 class="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</h2>
       <nav class="space-y-0.5">
         <a 
            v-for="item in menuItems" 
            :key="item.name"
            href="#" 
            @click.prevent="router.push(item.path)"
            :class="[
              'flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 group',
              activeItem === item.name 
                ? 'bg-black text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            ]"
         >
           <svg class="mr-2.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="activeItem === item.name ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-600'">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
           </svg>
           {{ item.name }}
         </a>
       </nav>
    </div>

    
    <div class="mt-auto p-4 border-t border-gray-100">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">User Name</p>
          <p class="text-xs text-gray-500">user@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
