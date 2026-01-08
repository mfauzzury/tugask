<script setup lang="ts">
import { ref } from 'vue';

const stats = ref([
  { title: 'Total Tasks', value: 12, change: '+2', trend: 'up' },
  { title: 'In Progress', value: 4, change: '0', trend: 'neutral' },
  { title: 'Completed', value: 8, change: '+5', trend: 'up' },
  { title: 'Overdue', value: 2, change: '-1', trend: 'down' },
]);

const recentActivity = ref([
  { id: 1, user: 'Admin User', action: 'moved task', target: 'Research Competitors', time: '2 hours ago', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 2, user: 'Staff One', action: 'completed', target: 'Initial Setup', time: '4 hours ago', icon: 'M5 13l4 4L19 7' },
  { id: 3, user: 'Admin User', action: 'commented on', target: 'Draft Proposal', time: '1 day ago', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
]);

const myWorkload = ref([
  { 
    id: 101, 
    title: 'Review PRs', 
    due: 'Today', 
    status: 'In Progress', 
    progress: 75,
    subtasks: [
      { id: 1, text: 'Review backend PR', completed: true },
      { id: 2, text: 'Review frontend PR', completed: true },
      { id: 3, text: 'Test changes', completed: false },
    ]
  },
  { 
    id: 102, 
    title: 'Update Documentation', 
    due: 'Tomorrow', 
    status: 'Todo', 
    progress: 20,
    subtasks: [
      { id: 1, text: 'Update API docs', completed: true },
      { id: 2, text: 'Update user guide', completed: false },
      { id: 3, text: 'Add examples', completed: false },
      { id: 4, text: 'Review grammar', completed: false },
      { id: 5, text: 'Publish changes', completed: false },
    ]
  },
  { 
    id: 103, 
    title: 'Client Meeting', 
    due: 'Friday', 
    status: 'Todo', 
    progress: 0,
    subtasks: []
  },
]);
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-primary mb-6">Dashboard</h2>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div v-for="stat in stats" :key="stat.title" class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-medium text-gray-500">{{ stat.title }}</span>
            <span 
              :class="{
                'text-green-600': stat.trend === 'up',
                'text-gray-400': stat.trend === 'neutral',
                'text-red-500': stat.trend === 'down'
              }"
              class="text-[10px] font-semibold"
            >{{ stat.change }}</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main Column: My Workload -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
          <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-bold text-base text-gray-900">My Workload</h3>
            <a href="#" class="text-xs text-gray-500 hover:text-black">View all</a>
          </div>
          <div class="p-4">
            <div class="space-y-2">
              <div v-for="task in myWorkload" :key="task.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100/50">
                <div class="flex-1">
                   <div class="flex items-center gap-2 mb-1">
                     <h4 class="font-medium text-sm text-gray-900">{{ task.title }}</h4>
                     <span v-if="task.subtasks && task.subtasks.length > 0" class="flex items-center gap-1 text-[10px] text-gray-500">
                       <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                       </svg>
                       {{ task.subtasks.filter((s: any) => s.completed).length }}/{{ task.subtasks.length }}
                     </span>
                   </div>
                   <p class="text-[10px] text-gray-500 mb-1.5">Due: {{ task.due }}</p>
                   
                   <!-- Progress Meter -->
                   <div class="flex items-center gap-2">
                     <div class="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden max-w-[200px]">
                       <div 
                         class="bg-black h-full rounded-full transition-all duration-300"
                         :style="{ width: `${task.progress || 0}%` }"
                       ></div>
                     </div>
                     <span class="text-[10px] font-medium text-gray-600 w-8 text-right">{{ task.progress || 0 }}%</span>
                   </div>
                </div>
                <span 
                  class="px-2 py-0.5 rounded-full text-[10px] font-medium ml-3"
                  :class="task.status === 'Todo' ? 'bg-gray-200 text-gray-800' : 'bg-black text-white'"
                >
                  {{ task.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Column: Recent Activity -->
      <div class="lg:col-span-1">
         <div class="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
          <div class="px-4 py-3 border-b border-gray-100">
            <h3 class="font-bold text-base text-gray-900">Recent Activity</h3>
          </div>
          <div class="p-4">
            <div class="flow-root">
              <ul class="-mb-6">
                <li v-for="(item, index) in recentActivity" :key="item.id">
                  <div class="relative pb-6">
                    <span v-if="index !== recentActivity.length - 1" class="absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div class="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white">
                         <svg class="h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                         </svg>
                      </div>
                      <div class="min-w-0 flex-1 pt-0.5 flex justify-between space-x-2">
                        <div>
                          <p class="text-xs text-gray-500">
                            <span class="font-medium text-gray-900">{{ item.user }}</span> {{ item.action }} <a href="#" class="font-medium text-gray-900">{{ item.target }}</a>
                          </p>
                        </div>
                        <div class="text-right text-[10px] whitespace-nowrap text-gray-500">
                          <time :datetime="item.time">{{ item.time }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
