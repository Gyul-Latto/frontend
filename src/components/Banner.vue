<script setup>
import bannerImage from '@/assets/images/banner.svg';
</script>

<template>
  <div class="banner">
    <div class="text">
      <h2>믿을만한 부동산 거래</h2>
      <p>사용자 기반 추천을 지금 경험해보세요</p>
    </div>
    <div class="image">
      <img :src="bannerImage" alt="배너 이미지" />
    </div>
  </div>
</template>

<style scoped>
.banner {
  display: flex; /* 텍스트와 이미지를 가로로 정렬 */
  justify-content: space-between; /* 텍스트와 이미지를 양 끝으로 배치 */
  align-items: center; /* 세로 정렬 */
  background-color: var(--color-one);
  padding: 4rem;
  border-radius: 10px;
}

.text {
  text-align: left;
}

.banner h2 {
  font-size: 1.5rem;
  color: var(--color-four);
}

.banner p {
  font-size: 1rem;
  color: black;
}

.image {
  flex-shrink: 0; 
}

.image img {
  width: 500px; 
  /* height: 250px;  */
}
</style>
