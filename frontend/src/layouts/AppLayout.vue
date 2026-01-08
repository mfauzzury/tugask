<script setup lang="ts">
import Header from '../components/layout/Header.vue';
import Sidebar from '../components/layout/Sidebar.vue';
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-background text-secondary">
    <Header />
    <div class="flex-1 flex overflow-hidden">
      <Sidebar />
      <main class="flex-1 p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
