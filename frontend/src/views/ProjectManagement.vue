<script setup lang="ts">
import { ref } from 'vue';
import { useProjects } from '../composables/useProjects';
import ProjectFormModal from '../components/projects/ProjectFormModal.vue';

const { projects, deleteProject } = useProjects();
const showModal = ref(false);
const editingProject = ref<typeof projects.value[0] | null>(null);

const handleEditProject = (project: typeof projects.value[0]) => {
  editingProject.value = project;
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
  editingProject.value = null;
};

const handleDeleteProject = (id: number) => {
  if (confirm('Are you sure you want to delete this project?')) {
    deleteProject(id);
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-primary">Projects</h2>
      <button @click="showModal = true" class="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors shadow-sm">
        + New Project
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: project.color }"
            ></div>
            <h3 class="font-bold text-sm text-gray-900">{{ project.name }}</h3>
          </div>
          <div class="flex items-center gap-1">
            <button
              @click.stop="handleEditProject(project)"
              class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-opacity"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click.stop="handleDeleteProject(project.id)"
              class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <p class="text-xs text-gray-500 mb-3 line-clamp-2">{{ project.description }}</p>
        
        <div class="flex items-center justify-between text-[10px] text-gray-400">
          <div class="flex items-center gap-3">
            <span>{{ project.buckets.length }} buckets</span>
            <span>{{ project.teamMemberIds.length }} members</span>
          </div>
          <span>{{ new Date(project.createdAt).toLocaleDateString() }}</span>
        </div>

        <div class="mt-3 pt-3 border-t border-gray-100">
          <router-link 
            :to="`/projects/${project.id}/board`"
            class="text-xs font-medium text-black hover:underline"
          >
            Open Board →
          </router-link>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="projects.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-12 text-center"
      >
        <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <p class="text-sm text-gray-500 mb-2">No projects yet</p>
        <button @click="showModal = true" class="text-xs text-black hover:underline">Create your first project</button>
      </div>
    </div>

    <!-- Project Form Modal -->
    <ProjectFormModal
      v-if="showModal"
      :project="editingProject || undefined"
      :mode="editingProject ? 'edit' : 'create'"
      @close="handleCloseModal"
    />
  </div>
</template>

