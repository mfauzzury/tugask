<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProjects, type Project } from '../../composables/useProjects';
import { useUsers } from '../../composables/useUsers';

const props = defineProps<{
  project?: Project;
  mode?: 'create' | 'edit';
}>();

const emit = defineEmits(['close']);
const { addProject, updateProject } = useProjects();
const { users } = useUsers();

const form = ref({
  name: props.project?.name || '',
  description: props.project?.description || '',
  color: props.project?.color || '#000000',
  teamMemberIds: props.project?.teamMemberIds || []
});

const colors = ['#000000', '#404040', '#737373', '#a3a3a3', '#d4d4d4'];

// Search functionality
const searchQuery = ref('');
const showDropdown = ref(false);

const availableUsers = computed(() => 
  users.value.filter(u => u.status === 'Active')
);

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return [];
  
  const query = searchQuery.value.toLowerCase();
  return availableUsers.value.filter(user => 
    !form.value.teamMemberIds.includes(user.id) &&
    (user.name.toLowerCase().includes(query) || 
     user.email.toLowerCase().includes(query))
  );
});

const selectedMembers = computed(() => 
  users.value.filter(u => form.value.teamMemberIds.includes(u.id))
);

const addMember = (userId: number) => {
  if (!form.value.teamMemberIds.includes(userId)) {
    form.value.teamMemberIds.push(userId);
  }
  searchQuery.value = '';
  showDropdown.value = false;
};

const removeMember = (userId: number) => {
  const index = form.value.teamMemberIds.indexOf(userId);
  if (index > -1) {
    form.value.teamMemberIds.splice(index, 1);
  }
};

const handleSearchFocus = () => {
  showDropdown.value = true;
};

const handleSearchBlur = () => {
  // Delay to allow click on dropdown items
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const submitProject = () => {
  if (form.value.name) {
    if (props.mode === 'edit' && props.project) {
      updateProject(props.project.id, {
        name: form.value.name,
        description: form.value.description,
        color: form.value.color,
        teamMemberIds: form.value.teamMemberIds
      });
    } else {
      addProject({
        name: form.value.name,
        description: form.value.description,
        color: form.value.color,
        teamMemberIds: form.value.teamMemberIds
      });
    }
    emit('close');
  }
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
      
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900">{{ mode === 'edit' ? 'Edit' : 'New' }} Project</h3>
        <button @click="emit('close')" class="text-gray-400 hover:text-black">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitProject" class="p-4 space-y-3 overflow-y-auto flex-1">
        
        <!-- Name -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Project Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="e.g. Website Redesign" 
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
            placeholder="Brief description of the project..."
          ></textarea>
        </div>

        <!-- Color -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Color</label>
          <div class="flex gap-2">
            <button
              v-for="color in colors"
              :key="color"
              type="button"
              @click="form.color = color"
              class="w-8 h-8 rounded-md border-2 transition-all"
              :class="form.color === color ? 'border-black scale-110' : 'border-gray-200'"
              :style="{ backgroundColor: color }"
            ></button>
          </div>
        </div>

        <!-- Team Members -->
        <div>
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Team Members</label>
          
          <!-- Search Input -->
          <div class="relative">
            <input 
              v-model="searchQuery"
              @focus="handleSearchFocus"
              @blur="handleSearchBlur"
              type="text" 
              placeholder="Search users by name or email..." 
              class="w-full text-xs border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50 pr-8" 
            />
            <svg class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <!-- Dropdown Results -->
            <div 
              v-if="showDropdown && filteredUsers.length > 0"
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-10"
            >
              <div
                v-for="user in filteredUsers"
                :key="user.id"
                @click="addMember(user.id)"
                class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div class="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-gray-900 truncate">{{ user.name }}</div>
                  <div class="text-[10px] text-gray-500 truncate">{{ user.email }}</div>
                </div>
                <span 
                  class="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                  :class="user.role === 'Admin' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
                >
                  {{ user.role }}
                </span>
              </div>
            </div>

            <!-- No Results -->
            <div 
              v-if="showDropdown && searchQuery && filteredUsers.length === 0"
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10"
            >
              <p class="text-xs text-gray-400 text-center">No users found</p>
            </div>
          </div>

          <!-- Selected Members (Tags) -->
          <div v-if="selectedMembers.length > 0" class="flex flex-wrap gap-2 mt-2">
            <div
              v-for="member in selectedMembers"
              :key="member.id"
              class="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full pl-2 pr-1 py-1 group hover:bg-gray-200 transition-colors"
            >
              <span class="text-xs font-medium text-gray-900">{{ member.name }}</span>
              <button
                type="button"
                @click="removeMember(member.id)"
                class="w-4 h-4 rounded-full hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-[10px] text-gray-400 mt-2">
            No team members added yet
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
          @click="submitProject" 
          class="px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors shadow-sm"
        >
          {{ mode === 'edit' ? 'Save Changes' : 'Create Project' }}
        </button>
      </div>

    </div>
  </div>
</template>
