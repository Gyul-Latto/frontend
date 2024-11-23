<script setup>
import Header from './components/Header.vue';
import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- 기본 경로가 /이므로 home -->
  </div>
</template>

<style></style>
