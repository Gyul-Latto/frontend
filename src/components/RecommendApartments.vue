<script setup></script>

<template>
  <section class="recommend-section">
    <h3>문인규님의 추천 아파트</h3>
    <div class="recommend-list">
      <div class="recommend-item">
        <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
      </div>
      <div class="recommend-item">
        <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
      </div>
      <div class="recommend-item">
        <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
      </div>
      <div class="recommend-item">
        <img src="@/assets/images/sampleApartment.jpeg" alt="아파트" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.recommend-section {
  margin-bottom: 2rem;
}

.recommend-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.recommend-item {
  flex: 1 1 calc(25% - 1rem);
  max-width: calc(25% - 1rem);
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.recommend-item img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}
</style>
