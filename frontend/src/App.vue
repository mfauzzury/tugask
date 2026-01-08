<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from './layouts/AppLayout.vue';
import TaskFormModal from './components/tasks/TaskFormModal.vue';

const route = useRoute();

// Check if current route is an auth page (login/register)
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});
</script>

<template>
  <!-- Auth pages without layout -->
  <div v-if="isAuthPage">
    <router-view />
  </div>

  <!-- Regular pages with layout -->
  <div v-else>
    <AppLayout>
      <router-view />
    </AppLayout>
    <TaskFormModal />
  </div>
</template>
