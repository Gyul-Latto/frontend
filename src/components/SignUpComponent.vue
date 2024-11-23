<script setup>
import locationBarComponent from './locationBarComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const selectedDong = ref('');
const selectedGender = ref('');

const handleDongChanged = (code) => {
  selectedDong.value = code;
};
const selectGender = (gender) => {
  selectedGender.value = gender;
};

const email = ref('');
const password = ref('');
const passwordCheck = ref('');
const name = ref('');
const birthday = ref('');

const handleSubmit = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
      username: name.value,
      birthday: birthday.value,
      dong: selectedDong.value,
      gender: selectedGender.value,
    };

    const response = await axios.post('http://localhost:8080/api/members', data);
    if (response.data.statusCode === 200) {
      console.log('Navigating to /login');
      router.replace({ name: 'login' });
    }
  } catch (e) {
    alert('회원가입 실패');
    console.error('Signup failed', e);
  }
  // 실패하면 else에서 안걸리고 catch에서 걸림
};
</script>

<template>
  <div>
    <div class="sign-up-container">
      <div class="sign-up-header">
        <div class="logo"></div>
        <div class="brand">latto</div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div id="sign-up-box">
          <div class="input-box">
            <input
              v-model="email"
              class="placeholder-image-for-user"
              id="id"
              placeholder="이메일"
              type="text"
              required
            />
            <input
              v-model="password"
              class="placeholder-image-for-password"
              id="pw"
              placeholder="비밀번호"
              type="password"
              required
            />
            <input
              v-model="passwordCheck"
              class="placeholder-image-for-password"
              id="pw-check"
              placeholder="비밀번호 확인"
              type="password"
              required
            />
          </div>
          <div class="input-box">
            <input
              v-model="name"
              class="placeholder-image-for-user"
              id="name"
              placeholder="이름"
              type="text"
              required
            />
            <input
              v-model="birthday"
              class="placeholder-image-for-calendar"
              id="birthday"
              placeholder="생년월일"
              type="text"
              @focus="(e) => (e.target.type = 'date')"
              @blur="(e) => (e.target.type = 'text')"
              required
            />
          </div>

          <div class="location-bar">
            <locationBarComponent @dong-changed="handleDongChanged" />
            <!-- <input type="hidden" :value="selectedDong" /> -->
            <div class="gender-boxes">
              <div
                class="gender-box gender-box-left"
                :class="{ selected: selectedGender === '남' }"
                @click="selectGender('남')"
              >
                남자
              </div>
              <div
                class="gender-box gender-box-right"
                :class="{ selected: selectedGender === '여' }"
                @click="selectGender('여')"
              >
                여자
              </div>
            </div>
          </div>
          <button id="sign-up-btn" type="submit">회원가입</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.sign-up-header {
  display: flex;
  align-items: center;
}
.sign-up-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

#sign-up-box {
  height: 590px;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center; /* Center elements vertically */
  padding: 0 20px;
  /* align-items: center; */
  gap: 20px;
}
.input-box {
  display: flex;
  flex-direction: column;
}
#id,
#name,
#location {
  width: 410px;
  height: 60px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #c4c7ca;
}
#pw {
  width: 410px;
  height: 60px;
  border: 1px solid #c4c7ca;
  border-top: none;
}
#pw-check,
#birthday,
#gender {
  width: 410px;
  height: 60px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #c4c7ca;
  border-top: none;
}
.checkbox-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkbox-container input {
  margin-right: 5px;
}
#sign-up-btn {
  /* width: 410px; */
  height: 50px;
  color: var(--color-four);
  background-color: var(--color-one);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.divider {
  color: var(--color-four);
  margin: 0 30px;
}

input {
  padding: 0 15px; /* 원하는 패딩 값 */
}
input:focus {
  outline: none;
}
.placeholder-image-for-user {
  background: url('../assets/images/icons/user.png') no-repeat;
  background-position: 10px center;
  padding-left: 45px;
}
.placeholder-image-for-password {
  background: url('../assets/images/icons/password.png') no-repeat;
  background-position: 10px center;
  padding-left: 45px;
}
.placeholder-image-for-calendar {
  background: url('../assets/images/icons/calendar.png') no-repeat;
  background-position: 10px center;
  padding-left: 45px;
}
.location-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: solid 1px #c4c7ca;
  border-radius: 10px;
}
.gender-boxes {
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  padding: 0 20px;
}
.gender-box {
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
}
.gender-box.selected {
  background-color: var(--color-three);
  color: white;
  border-color: var(--color-three);
}
.gender-box-left {
  border-radius: 10px 0 0 10px;
}
.gender-box-right {
  border-radius: 0 10px 10px 0;
}
</style>
