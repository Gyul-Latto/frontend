<script setup>
import MapSearchBar from './MapSearchBar.vue';
</script>

<template>
  <div>
    <div class="sign-up-container">
      <div class="sign-up-header">
        <div class="logo"></div>
        <div class="brand">latto</div>
      </div>
      <form>
        <div id="sign-up-box">
          <div class="input-box">
            <input class="placeholder-image-for-user" id="id" placeholder="이메일" type="text" />
            <input
              class="placeholder-image-for-password"
              id="pw"
              placeholder="비밀번호"
              type="password"
            />
            <input
              class="placeholder-image-for-password"
              id="pw-check"
              placeholder="비밀번호 확인"
              type="password"
            />
          </div>
          <div class="input-box">
            <input class="placeholder-image-for-user" id="name" placeholder="이름" type="text" />
            <input
              class="placeholder-image-for-calendar"
              id="birthday"
              placeholder="생년월일"
              type="text"
              @focus="(e) => (e.target.type = 'date')"
              @blur="(e) => (e.target.type = 'text')"
            />
          </div>

          <div class="input-box">
            
            <MapSearchBar />
            <!-- <input id="gender" placeholder="성별" type="text" /> -->
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
</style>
