<script setup></script>

<template>
    <section class="other-houses-section">
      <h3>이런 집은 어때요?</h3>
      <p>문인규님과 비슷한 성향을 가진 사람들이 선택한 집을 추천드립니다.</p>
      <div class="other-houses-list">
        <div class="house-card">용산구 최고의 치안</div>
        <div class="house-card">용산구 가성비 갑</div>
      </div>
    </section>
</template>
  
<style scoped>
  .other-houses-section {
    margin-bottom: 2rem;
  }
  
  .other-houses-list {
    display: flex;
    gap: 1rem;
  }
  
  .house-card {
    flex: 1;
    padding: 8rem;
    background-color: var(--color-one);
    border-radius: 10px;
    text-align: center;
  }
</style>
  