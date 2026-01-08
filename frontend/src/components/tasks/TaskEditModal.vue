<script setup lang="ts">
import { ref } from 'vue';

interface Task {
  id: number;
  title: string;
  description?: string;
  due?: string;
  priority?: string;
  assigneeId?: number;
}

const props = defineProps<{
  task: Task;
  projectId: number;
  bucketId: number;
}>();

const emit = defineEmits(['close', 'save']);

const form = ref({
  title: props.task.title,
  description: props.task.description || '',
  due: props.task.due || '',
  priority: props.task.priority || 'Medium',
});

const handleSave = () => {
  emit('save', {
    ...props.task,
    ...form.value
  });
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
      
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900">Edit Task</h3>
        <button @click="emit('close')" class="text-gray-400 hover:text-black">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSave" class="p-4 space-y-3">
        
        <!-- Title -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            class="w-full text-sm border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" 
            required 
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Description</label>
          <textarea 
            v-model="form.description" 
            rows="3" 
            class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50 resize-none"
          ></textarea>
        </div>

        <!-- Row: Due Date & Priority -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Due Date</label>
            <input 
              v-model="form.due" 
              type="text" 
              placeholder="Jan 15"
              class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" 
            />
          </div>
          <div>
            <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Priority</label>
            <select 
              v-model="form.priority" 
              class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

      </form>

      <!-- Footer -->
      <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <button 
          type="button" 
          @click="emit('close')" 
          class="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button 
          type="button" 
          @click="handleSave" 
          class="px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
</template>
