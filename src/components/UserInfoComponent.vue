<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';

import { clearAuthData } from '../utils/userUtils';

import axios from 'axios';
import { watch } from 'vue';
const userStore = useUserStore();
const authStore = useAuthStore();
// const user = userStore.userInfo;

const user = ref();

watch(
  () => userStore.userInfo,
  () => {
    user.value = userStore.userInfo;
  },
  {
    immediate: true,
    deep: true,
  },
);

const updateBtn = () => {
  const userId = user.value.userId;
  router.push({ name: 'mypage-detail', params: { id: userId } });
};

const deleteBtn = async () => {
  const flag = confirm('정말 탈퇴하시겠습니까?');
  if (flag) {
    try {
      const token = authStore.token;
      await axios.delete(`http://localhost:8080/api/members/${user.value.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearAuthData();
      router.replace('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
};
</script>

<template>
  <div>
    <div class="container">
      <img class="icon" src="../assets/images/icons/user-profile.png" alt="user" />
      <span class="username">{{ user.username }}</span>
      <span class="email">{{ user.email }}</span>
      <div class="btn-box">
        <button id="update-btn" type="button" @click="updateBtn">정보수정</button>
        <button id="delete-btn" type="button" @click="deleteBtn">회원탈퇴</button>
      </div>
      <span class="list-text">좋아요를 누른 아파트</span>
      <div class="item-list">
        <div class="popular-item">
          <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
        </div>
        <div class="popular-item">
          <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
        </div>
        <div class="popular-item">
          <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
        </div>
        <div class="popular-item">
          <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
.username {
  font-size: 30px;
  margin: 20px 0;
}
.email {
  font-size: 20px;
  margin-bottom: 20px;
}
.input-box {
  display: flex;
  flex-direction: column;
}

.btn-box {
  display: flex;
  gap: 50px;
}
#delete-btn {
  width: 200px;
  height: 50px;
  color: var(--color-four);
  background-color: var(--color-one);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}

#update-btn {
  width: 200px;
  height: 50px;
  color: var(--color-four);
  background-color: var(--color-one);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.list-text {
  font-size: 20px;
  margin: 60px 0 30px 0;
}
.popular-item {
  flex: 1 1 calc(25% - 1rem);
  max-width: calc(25% - 1rem);
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.popular-item img {
  width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}
.item-list {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
</style>
