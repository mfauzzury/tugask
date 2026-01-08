<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useBuckets } from '../composables/useBuckets';
import draggable from 'vuedraggable';
import TaskEditModal from '../components/tasks/TaskEditModal.vue';

const route = useRoute();
const { getProjectById } = useProjects();
const { getBucketsByProject, addBucket, deleteBucket, updateBucket } = useBuckets();

const projectId = computed(() => parseInt(route.params.projectId as string));
const project = computed(() => getProjectById(projectId.value));
const buckets = computed(() => getBucketsByProject(projectId.value));

const showBucketModal = ref(false);
const newBucketName = ref('');

// Bucket editing
const editingBucketId = ref<number | null>(null);
const editingBucketName = ref('');

// Task editing
const editingTask = ref<any>(null);
const editingTaskBucketId = ref<number | null>(null);

// Mock tasks data (will be replaced with useTasks in Phase 3)
const tasksByBucket = ref<Record<number, any[]>>({});

onMounted(() => {
  // Initialize empty task arrays for each bucket
  buckets.value.forEach(bucket => {
    if (!tasksByBucket.value[bucket.id]) {
      tasksByBucket.value[bucket.id] = [];
    }
  });
  
  // Add some mock tasks for demonstration
  if (buckets.value.length > 0) {
    tasksByBucket.value[buckets.value[0].id] = [
      { id: 1, title: 'Research Competitors', due: 'Jan 15', description: 'Analyze top 3 competitors' },
      { id: 2, title: 'Draft Proposal', due: 'Jan 18', description: 'Create initial project proposal' },
    ];
    if (buckets.value.length > 1) {
      tasksByBucket.value[buckets.value[1].id] = [
        { id: 3, title: 'Design Homepage', due: 'Jan 20', description: 'Mockup for homepage' },
      ];
    }
  }
});

const handleAddBucket = () => {
  if (newBucketName.value.trim()) {
    addBucket(projectId.value, newBucketName.value);
    tasksByBucket.value[buckets.value[buckets.value.length - 1].id] = [];
    newBucketName.value = '';
    showBucketModal.value = false;
  }
};

const handleDeleteBucket = (bucketId: number) => {
  if (confirm('Delete this bucket? Tasks will be lost.')) {
    deleteBucket(projectId.value, bucketId);
    delete tasksByBucket.value[bucketId];
  }
};

const startEditingBucket = (bucketId: number, currentName: string) => {
  editingBucketId.value = bucketId;
  editingBucketName.value = currentName;
};

const saveEditingBucket = (bucketId: number) => {
  if (editingBucketName.value.trim()) {
    updateBucket(projectId.value, bucketId, { name: editingBucketName.value });
  }
  editingBucketId.value = null;
  editingBucketName.value = '';
};

const cancelEditingBucket = () => {
  editingBucketId.value = null;
  editingBucketName.value = '';
};

const openTaskEdit = (task: any, bucketId: number) => {
  editingTask.value = task;
  editingTaskBucketId.value = bucketId;
};

const closeTaskEdit = () => {
  editingTask.value = null;
  editingTaskBucketId.value = null;
};

const saveTaskEdit = (updatedTask: any) => {
  if (editingTaskBucketId.value !== null) {
    const tasks = tasksByBucket.value[editingTaskBucketId.value];
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
  }
};

const log = (evt: any) => {
  console.log('Task moved:', evt);
};
</script>

<template>
  <div v-if="project">
    <div class="flex items-center justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: project.color }"></div>
          <h2 class="text-xl font-bold text-primary">{{ project.name }}</h2>
        </div>
        <p class="text-xs text-gray-500">{{ project.description }}</p>
      </div>
      <button 
        @click="showBucketModal = true"
        class="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors shadow-sm"
      >
        + New Bucket
      </button>
    </div>

    <!-- Kanban Board -->
    <div class="flex gap-4 overflow-x-auto pb-4">
      <div 
        v-for="bucket in buckets" 
        :key="bucket.id"
        class="flex-shrink-0 w-72 flex flex-col bg-gray-100 rounded-lg p-3 min-h-[500px]"
      >
        <!-- Bucket Header -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2 flex-1">
            <!-- Editable Bucket Name -->
            <input
              v-if="editingBucketId === bucket.id"
              v-model="editingBucketName"
              @blur="saveEditingBucket(bucket.id)"
              @keyup.enter="saveEditingBucket(bucket.id)"
              @keyup.esc="cancelEditingBucket"
              @focus="($event.target as HTMLInputElement).select()"
              class="font-semibold text-sm bg-white border border-black rounded px-1 py-0.5 flex-1 focus:outline-none"
              autofocus
            />
            <h3 
              v-else
              @dblclick="startEditingBucket(bucket.id, bucket.name)"
              class="font-semibold text-sm cursor-pointer hover:text-gray-600 flex-1"
              :title="'Double-click to edit'"
            >
              {{ bucket.name }}
            </h3>
            <span class="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">
              {{ tasksByBucket[bucket.id]?.length || 0 }}
            </span>
          </div>
          <button 
            @click="handleDeleteBucket(bucket.id)"
            class="text-gray-400 hover:text-red-600 transition-colors ml-2"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Tasks -->
        <draggable 
          v-model="tasksByBucket[bucket.id]" 
          group="tasks" 
          item-key="id"
          @change="log"
          class="space-y-2 min-h-[100px] flex-1"
        >
          <template #item="{ element }">
            <div 
              @click="openTaskEdit(element, bucket.id)"
              class="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div class="text-sm font-medium mb-1">{{ element.title }}</div>
              <div class="text-[10px] text-gray-500">{{ element.due }}</div>
            </div>
          </template>
        </draggable>
      </div>

      <!-- Add Bucket Placeholder -->
      <div 
        class="flex-shrink-0 w-72 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
        @click="showBucketModal = true"
      >
        <div class="text-center py-8">
          <svg class="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <p class="text-xs text-gray-400">Add Bucket</p>
        </div>
      </div>
    </div>

    <!-- Add Bucket Modal -->
    <div v-if="showBucketModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden border border-gray-100">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="text-sm font-bold text-gray-900">New Bucket</h3>
          <button @click="showBucketModal = false" class="text-gray-400 hover:text-black">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleAddBucket" class="p-4">
          <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">Bucket Name</label>
          <input 
            v-model="newBucketName" 
            type="text" 
            placeholder="e.g. Testing, Deployment" 
            class="w-full text-sm border-gray-200 rounded-md focus:border-black focus:ring-black px-2 py-1.5 bg-gray-50" 
            required 
            autofocus
          />
        </form>

        <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
          <button 
            type="button" 
            @click="showBucketModal = false" 
            class="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button" 
            @click="handleAddBucket" 
            class="px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            Create Bucket
          </button>
        </div>
      </div>
    </div>

    <!-- Task Edit Modal -->
    <TaskEditModal
      v-if="editingTask"
      :task="editingTask"
      :project-id="projectId"
      :bucket-id="editingTaskBucketId!"
      @close="closeTaskEdit"
      @save="saveTaskEdit"
    />
  </div>

  <!-- Project Not Found -->
  <div v-else class="flex flex-col items-center justify-center py-12">
    <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-sm text-gray-500">Project not found</p>
    <router-link to="/projects" class="text-xs text-black hover:underline mt-2">Back to Projects</router-link>
  </div>
</template>
