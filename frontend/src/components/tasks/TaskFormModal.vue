<script setup lang="ts">
import { ref } from 'vue';
import { useTaskModal } from '../../composables/useTaskModal';
import { useUsers } from '../../composables/useUsers';

const { isOpen, closeModal } = useTaskModal();
const { users } = useUsers();

const form = ref({
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '',
  assignee: ''
});

const submitTask = () => {
  // TODO: implement actual submission logic
  console.log('New Task:', form.value);
  closeModal();
  // Reset form
  form.value = {
    title: '',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '',
    assignee: ''
  };
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
      
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900">New Task</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-black">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitTask" class="p-4 space-y-3">
        
        <!-- Title -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Title</label>
          <input v-model="form.title" type="text" placeholder="e.g. Design Homepage" class="w-full text-sm border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" required />
        </div>

        <!-- Description -->
        <div>
           <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Description</label>
           <textarea v-model="form.description" rows="3" class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50 resize-none" placeholder="Add details..."></textarea>
        </div>

        <!-- Row: Status & Priority -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Status</label>
            <select v-model="form.status" class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50">
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Priority</label>
             <select v-model="form.priority" class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

         <!-- Row: Due Date & Assignee -->
        <div class="grid grid-cols-2 gap-3">
          <div>
             <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Due Date</label>
             <input v-model="form.dueDate" type="date" class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" />
          </div>
          <div>
             <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Assignee</label>
             <select v-model="form.assignee" class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50">
                <option value="" disabled>Select User</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }}
                </option>
             </select>
          </div>
        </div>

      </form>

      <!-- Footer -->
      <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <button type="button" @click="closeModal" class="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors">Cancel</button>
        <button type="button" @click="submitTask" class="px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors shadow-sm">Create Task</button>
      </div>

    </div>
  </div>
</template>
