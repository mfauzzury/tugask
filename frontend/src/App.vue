<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
import TaskFormModal from './components/tasks/TaskFormModal.vue';
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
  <TaskFormModal />
</template>
