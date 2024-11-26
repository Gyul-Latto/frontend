<script>
export default {
  name: 'NotFoundComponent',
};
</script>

<template>
  <div class="container-404">
    <img src="../assets/images/404error.png" />
    <p style="color: var(--color-four)">죄송합니다. 페이지를 찾을 수 없습니다.</p>
    <router-link to="/"><p style="color: var(--color-three)">홈으로</p></router-link>
  </div>
</template>

<style scoped>
.container-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
}
img {
  width: 404px;
}
a {
  font-size: 1.5rem;
  color: #333;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;
}
p {
  margin: 0;
}
</style>
