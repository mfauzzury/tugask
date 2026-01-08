<script setup lang="ts">
import { ref } from 'vue';
import { useUsers, type User } from '../composables/useUsers';

const { users, addUser: addNewUser } = useUsers();

const showModal = ref(false);
const newUser = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'Staff',
  status: 'Active'
});

const handleAddUser = () => {
  if (newUser.value.name && newUser.value.email) {
    addNewUser({
      name: newUser.value.name,
      email: newUser.value.email,
      role: newUser.value.role as 'Admin' | 'Staff',
      status: 'Active'
    });
    showModal.value = false;
    newUser.value = { name: '', email: '', role: 'Staff', status: 'Active' };
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-primary">User Management</h2>
      <button @click="showModal = true" class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
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
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 class="text-lg font-bold mb-4">Add New User</h3>
            <form @submit.prevent="handleAddUser">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input v-model="newUser.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                    </div>
                     <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input v-model="newUser.email" type="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                    </div>
                     <div>
                        <label class="block text-sm font-medium text-gray-700">Role</label>
                        <select v-model="newUser.role" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <button type="button" @click="showModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">Create</button>
                </div>
            </form>
        </div>
    </div>

  </div>
</template>
