<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const recommendations = ref([]);

const fetchRecommendations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/recommend', {
      params: {
        userId: 1, // 사용자 ID
        recommendationType: 'personalization', // 추천 타입
      },
    });
    if (response.data.statusCode === 200) {
      recommendations.value = response.data.data.reverse().slice(0, 4);
      console.log(recommendations.value);
    } else {
      console.error('Failed to fetch recommendations:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

onMounted(fetchRecommendations);
</script>

<template>
  <section class="recommend-section">
    <h3>문인규님의 추천 아파트</h3>
    <p class="section-description">문인규이 좋아요 한 아파트를 분석하여 추천드립니다.</p>
    <div class="recommend-list">
      <div 
        v-for="(apartment, index) in recommendations" 
        :key="index" 
        class="recommend-item"
      >
        <img :src="apartment.aptImg" alt="아파트" />
        <div class="recommend-info">
          <p class="apt-name">{{ apartment.umdNm }} <span class="apt-dong">- {{ apartment.aptNm }}</span></p>
          <p class="apt-details">{{ apartment.description }}</p>
        </div>
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
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s; 
  cursor: pointer; 
}

.recommend-item:hover {
  transform: translateY(-5px); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recommend-item img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.recommend-info {
  padding: 1rem;
  text-align: center; 
}

.apt-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333; 
}

.apt-details {
  font-size: 0.9rem;
  color: #555; 
  margin-top: 1rem; 
  text-align: center; 
}
</style>