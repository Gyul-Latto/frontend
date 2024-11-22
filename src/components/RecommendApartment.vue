<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 추천 아파트 데이터 상태
const recommendations = ref([]);

// 데이터 로드 함수
const fetchRecommendations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/recommend', {
      params: {
        userId: 1, // 사용자 ID
        recommendationType: 'personalization', // 추천 타입
      },
    });
    if (response.data.statusCode === 200) {
      console.log(response.data.data)
      recommendations.value = response.data.data;
    } else {
      console.error('Failed to fetch recommendations:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(fetchRecommendations);
</script>

<template>
  <section class="recommend-section">
    <h3>문인규님의 추천 아파트</h3>
    <div class="recommend-list">
      <div 
        v-for="(apartment, index) in recommendations" 
        :key="index" 
        class="recommend-item"
      >
        <img :src="apartment.aptImg" alt="아파트" />
        <div class="recommend-info">
          <p>{{ apartment.umdNm }} <strong>{{ apartment.aptNm }}</strong></p>
          <p>{{ apartment.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 이미지 경로 가져오기
function getApartmentImage(aptSeq) {
  // aptSeq에 따라 동적 이미지를 반환하거나 기본 이미지를 반환
  return `/assets/images/${aptSeq}.jpeg` || '@/assets/images/sampleApartment.jpeg';
}
</script>

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

.recommend-info {
  padding: 1rem;
  text-align: center;
  background-color: #ffffff;
}

.recommend-info p {
  margin: 0.5rem 0;
}
</style>
