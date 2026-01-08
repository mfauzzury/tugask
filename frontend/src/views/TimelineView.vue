<script setup lang="ts">
import { ref, computed } from 'vue';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    day: days[d.getDay() === 0 ? 6 : d.getDay() - 1],
    date: d.getDate(),
    fullDate: d.toISOString().split('T')[0]
  };
});

const tasks = ref([
  { id: 1, title: 'Research Competitors', start: 0, duration: 3, assignee: 'Admin' },
  { id: 2, title: 'Draft Proposal', start: 2, duration: 2, assignee: 'Staff One' },
  { id: 3, title: 'Design Homepage', start: 4, duration: 4, assignee: 'Admin' },
  { id: 4, title: 'Backend Setup', start: 1, duration: 5, assignee: 'Staff Two' },
  { id: 5, title: 'Client Meeting', start: 8, duration: 1, assignee: 'Admin' },
]);

const gridStyle = computed(() => {
  return {
    gridTemplateColumns: `200px repeat(${dates.length}, minmax(40px, 1fr))`
  };
});
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-primary">Timeline</h2>
      <div class="flex gap-2">
        <button class="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">This Week</button>
        <button class="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">Next Week</button>
      </div>
    </div>

    <div class="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
      <!-- Timeline Header -->
      <div class="grid bg-gray-50 border-b border-gray-200 overflow-x-auto" :style="gridStyle">
        <!-- Task Column Header -->
        <div class="p-3 text-xs font-bold text-gray-500 uppercase sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
          Task
        </div>
        <!-- Days Header -->
        <div 
          v-for="(date, index) in dates" 
          :key="index" 
          class="p-2 text-center border-l border-gray-100 flex flex-col items-center justify-center min-w-[40px]"
        >
          <span class="text-[10px] text-gray-400 font-medium">{{ date.day }}</span>
          <span class="text-xs font-bold text-gray-700">{{ date.date }}</span>
        </div>
      </div>

      <!-- Timeline Body -->
      <div class="overflow-auto flex-1 custom-scrollbar">
        <div class="grid" :style="gridStyle">
           <!-- Rows -->
           <template v-for="task in tasks" :key="task.id">
              <!-- Task Name Cell -->
              <div class="p-3 text-xs font-medium text-gray-900 border-b border-gray-100 border-r border-gray-200 sticky left-0 bg-white z-10 flex flex-col justify-center">
                {{ task.title }}
                <span class="text-[10px] text-gray-400 mt-0.5">{{ task.assignee }}</span>
              </div>
              
              <!-- Timeline Cells -->
              <div 
                class="col-span-full relative border-b border-gray-100 h-12" 
                :style="{ gridColumnStart: 2, gridColumnEnd: dates.length + 2 }"
              >
                  <!-- Background Grid Lines (Absolute) -->
                  <div class="absolute inset-0 grid h-full w-full pointer-events-none" :style="{ gridTemplateColumns: `repeat(${dates.length}, 1fr)` }">
                     <div v-for="n in dates.length" :key="n" class="border-l border-gray-100 h-full"></div>
                  </div>

                  <!-- Task Bar -->
                  <div 
                    class="absolute top-1/2 -translate-y-1/2 h-6 bg-black rounded-md shadow-sm hover:bg-gray-800 cursor-pointer transition-colors"
                    :style="{
                      left: `calc(${(task.start * 100) / dates.length}% + 2px)`,
                      width: `calc(${(task.duration * 100) / dates.length}% - 4px)`
                    }"
                  >
                    <!-- Tooltip could go here -->
                  </div>
              </div>
           </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d4d4d4;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a3a3a3;
}
</style>
