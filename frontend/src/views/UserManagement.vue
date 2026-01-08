<script setup lang="ts">
import { ref } from 'vue';
import { useUsers, type User } from '../composables/useUsers';

import { useProjects } from '../composables/useProjects';

const { users, addUser: addNewUser } = useUsers();
const { projects } = useProjects();

const showModal = ref(false);
const isEditing = ref(false);
const editingUserId = ref<number | null>(null);

const newUser = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'Staff',
  status: 'Active',
  phone: '',
  position: '',
  unit: '',
  assignedProjectIds: []
});

const openAddModal = () => {
  isEditing.value = false;
  editingUserId.value = null;
  newUser.value = { 
    name: '', 
    email: '', 
    role: 'Staff', 
    status: 'Active',
    phone: '',
    position: '',
    unit: '',
    assignedProjectIds: []
  };
  showModal.value = true;
};

const openEditModal = (user: User) => {
  isEditing.value = true;
  editingUserId.value = user.id;
  newUser.value = { ...user };
  showModal.value = true;
};

const handleSaveUser = () => {
  if (newUser.value.name && newUser.value.email) {
    if (isEditing.value && editingUserId.value) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === editingUserId.value);
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...newUser.value } as User;
      }
    } else {
      // Add new user
      addNewUser({
        name: newUser.value.name,
        email: newUser.value.email,
        role: newUser.value.role as 'Admin' | 'Staff',
        status: 'Active',
        phone: newUser.value.phone,
        position: newUser.value.position,
        unit: newUser.value.unit,
        assignedProjectIds: newUser.value.assignedProjectIds
      });
    }
    showModal.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-primary">User Management</h2>
      <button @click="openAddModal" class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
        + Add User
      </button>
    </div>

    <!-- User List Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="relative px-4 py-2">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-600">
                    {{ user.name.charAt(0) }}
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
              <div class="text-[10px] text-gray-400" v-if="user.phone">{{ user.phone }}</div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              {{ user.position || '-' }}
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              {{ user.unit || '-' }}
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
               <span class="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full"
                :class="user.role === 'Admin' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'">
                 {{ user.role }}
               </span>
            </td>
             <td class="px-4 py-2 whitespace-nowrap">
              <span class="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full"
                 :class="user.status === 'Active' ? 'text-green-800 bg-green-100' : 'text-gray-800 bg-gray-100'">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" @click.prevent="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
            <form @submit.prevent="handleSaveUser">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Personal Info -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1">Personal Info</h4>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                            <input v-model="newUser.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
                            <input v-model="newUser.email" type="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Phone</label>
                            <input v-model="newUser.phone" type="tel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                        </div>
                    </div>

                    <!-- Role & Position -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1">Role & Position</h4>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Position</label>
                            <input v-model="newUser.position" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Unit/Department</label>
                            <input v-model="newUser.unit" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-gray-700">Role</label>
                            <select v-model="newUser.role" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                                <option value="Staff">Staff</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-gray-700">Status</label>
                            <select v-model="newUser.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Project Assignment -->
                <div class="mt-6">
                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1 mb-3">Assign to Projects</h4>
                    <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-md border border-gray-200">
                        <div v-for="project in projects" :key="project.id" class="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                :id="'proj-' + project.id" 
                                :value="project.id" 
                                v-model="newUser.assignedProjectIds"
                                class="rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                            >
                            <label :for="'proj-' + project.id" class="text-sm text-gray-700 cursor-pointer select-none truncate">{{ project.name }}</label>
                        </div>
                        <div v-if="projects.length === 0" class="col-span-2 text-xs text-gray-500 italic text-center py-2">
                            No projects available
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" @click="showModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 shadow-sm">
                        {{ isEditing ? 'Save Changes' : 'Create User' }}
                    </button>
                </div>
            </form>
        </div>
    </div>

  </div>
</template>
