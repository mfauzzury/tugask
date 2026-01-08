<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskModal } from '../../composables/useTaskModal';
import { useUsers } from '../../composables/useUsers';

interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

const { isOpen, closeModal } = useTaskModal();
const { users } = useUsers();

const form = ref({
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '',
  assignee: '',
  progress: 0,
  subtasks: [] as Subtask[],
});

const newSubtaskText = ref('');
let nextSubtaskId = ref(1);

const addSubtask = () => {
  if (newSubtaskText.value.trim()) {
    form.value.subtasks.push({
      id: nextSubtaskId.value++,
      text: newSubtaskText.value.trim(),
      completed: false,
    });
    newSubtaskText.value = '';
  }
};

const toggleSubtask = (subtaskId: number) => {
  const subtask = form.value.subtasks.find(s => s.id === subtaskId);
  if (subtask) {
    subtask.completed = !subtask.completed;
  }
};

const deleteSubtask = (subtaskId: number) => {
  form.value.subtasks = form.value.subtasks.filter(s => s.id !== subtaskId);
};

const subtaskStats = computed(() => {
  const total = form.value.subtasks.length;
  const completed = form.value.subtasks.filter(s => s.completed).length;
  return { total, completed };
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
    assignee: '',
    progress: 0,
    subtasks: [],
  };
  nextSubtaskId.value = 1;
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

        <!-- Progress -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Progress</label>
          <div class="flex items-center gap-3">
            <input 
              v-model.number="form.progress" 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              class="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <span class="text-xs font-medium text-gray-700 w-10 text-right">{{ form.progress }}%</span>
          </div>
        </div>

        <!-- Subtasks -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-[10px] uppercase font-bold text-gray-500">Subtasks</label>
            <span v-if="form.subtasks.length > 0" class="text-[10px] text-gray-500">
              {{ subtaskStats.completed }}/{{ subtaskStats.total }} completed
            </span>
          </div>
          
          <!-- Add Subtask Input -->
          <div class="flex gap-2 mb-2">
            <input 
              v-model="newSubtaskText" 
              @keyup.enter="addSubtask"
              type="text" 
              placeholder="Add a subtask..."
              class="flex-1 text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" 
            />
            <button 
              type="button"
              @click="addSubtask"
              class="px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              + Add
            </button>
          </div>

          <!-- Subtask List -->
          <div v-if="form.subtasks.length > 0" class="space-y-1.5 max-h-40 overflow-y-auto">
            <div 
              v-for="subtask in form.subtasks" 
              :key="subtask.id"
              class="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <input 
                type="checkbox" 
                :checked="subtask.completed"
                @change="toggleSubtask(subtask.id)"
                class="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span 
                class="flex-1 text-xs"
                :class="subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'"
              >
                {{ subtask.text }}
              </span>
              <button 
                type="button"
                @click="deleteSubtask(subtask.id)"
                class="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
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
