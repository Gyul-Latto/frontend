<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const authStore = useAuthStore();
const userStore = useUserStore();
const hasLoggedIn = computed(() => authStore.token !== null);

const handleLogout = () => {
  authStore.setToken(null);
  userStore.setUserInfo(null);
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
        <li><router-link to="/cooperationApartments">다른 사람들 집</router-link></li>
        <li><router-link to="/popular">실시간 인기 아파트</router-link></li>
        <li><router-link to="/map">지도</router-link></li>
        <li v-if="hasLoggedIn"><router-link to="/mypage">마이페이지</router-link></li>
      </ul>
    </nav>

    <div class="header-right">
      <div class="auth-button" v-if="hasLoggedIn" @click="handleLogout" style="cursor: pointer">
        로그아웃
      </div>
      <div class="auth-button" v-else>
        <router-link to="/login">로그인 <span class="divider">|</span> 회원가입</router-link>
      </div>
    </div>
  </header>
</template>

<style src="@/styles/Header.css"></style>
