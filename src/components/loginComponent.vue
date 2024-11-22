<script setup>
import { ref } from 'vue';
import uncheckedImage from '../assets/images/uncheckedImage.png';
import checkedImage from '../assets/images/checkedImage.png';

const isChecked = ref(false);

function toggleCheckbox() {
  isChecked.value = !isChecked.value;
}
</script>

<template>
  <div>
    <div class="login-container">
      <div class="login-header">
        <div class="logo"></div>
        <div class="brand">latto</div>
      </div>
      <div id="form-box">
        <form>
          <div id="login-box">
            <div class="input-box">
              <input id="id" placeholder="이메일" type="text" />
              <input id="pw" placeholder="비밀번호" type="password" />
            </div>

            <div class="checkbox-container" @click="toggleCheckbox">
              <img style="margin-right: 10px" :src="isChecked ? checkedImage : uncheckedImage" />
              <span>로그인 상태 유지</span>
            </div>

            <button id="login-btn" type="submit">로그인</button>
          </div>
        </form>
      </div>
      <div class="find-box">
        아이디 찾기<span class="divider">|</span>비밀번호 찾기
        <span class="divider">|</span>회원가입
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-header {
  display: flex;
  align-items: center;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
#form-box {
  display: flex;
  flex-direction: column;

  border: 1px solid black; /* Example border */
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #c4c7ca;
  margin: 20px;
}
#login-box {
  /* width: 458px; */
  height: 269px;
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
#id {
  width: 410px;
  height: 60px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #c4c7ca;
}
#pw {
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
#login-btn {
  /* width: 410px; */
  height: 50px;
  color: var(--color-four);
  background-color: var(--color-one);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
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
</style>
