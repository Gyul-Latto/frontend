<script setup></script>

<template>
  <section class="popular-apartments-section">
    <h3>실시간 인기 아파트</h3>
    <div class="popular-list">
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
  </section>
</template>

<style scoped>
.popular-apartments-section {
  margin-bottom: 2rem;
}

.popular-list {
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem; 
  justify-content: space-between;
}

.popular-item {
  flex: 1 1 calc(25% - 1rem); 
  max-width: calc(25% - 1rem); 
  background-color: #f0f0f0; 
  border-radius: 10px;
  overflow: hidden; 
}

.popular-item img {
  width: 100%;
  aspect-ratio: 1 / 1; 
  object-fit: cover; 
  display: block; 
}
</style>
