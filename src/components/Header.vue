<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const store = useAuthStore();
const hasLoggedIn = computed(() => store.token === null);

const handleLogout = () => {
  store.setToken(null);
  router.replace('/');
};
</script>

<template>
  <header class="header">
    <div class="header-left">
      <div class="logo"></div>
      <span class="brand"><router-link to="/">latto</router-link></span>
    </div>

    <nav class="header-nav">
      <ul>
        <li><router-link to="/recommended">추천 아파트</router-link></li>
        <li><router-link to="/similar">다른 사람들 집</router-link></li>
        <li><router-link to="/popular">실시간 인기 아파트</router-link></li>
        <li><router-link to="/map">지도</router-link></li>
      </ul>
    </nav>

    <div class="header-right">
      <!-- <a href="#" class="auth-button">로그인 <span class="divider">|</span> 회원가입</a> -->
      <!-- <div class="auth-button">
        <router-link to="/login">로그인 <span class="divider">|</span> 회원가입</router-link>
      </div> -->
      <div class="auth-button" v-if="hasLoggedIn">
        <router-link to="/login">로그인 <span class="divider">|</span> 회원가입</router-link>
      </div>
      <div class="auth-button" v-else @click="handleLogout" style="cursor: pointer">로그아웃</div>
    </div>
  </header>
</template>

<style src="@/styles/Header.css"></style>
