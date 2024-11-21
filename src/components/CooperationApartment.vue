<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 추천 아파트 데이터 상태
const apartments = ref([]);

// 데이터 로드 함수
const loadRecommendations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/recommend', {
      params: {
        userId: 1, // 사용자 ID
        recommendationType: 'cooperation' // 추천 타입
      }
    });
    if (response.data.statusCode === 200) {
      apartments.value = response.data.data; // API의 data를 apartments에 저장
    } else {
      console.error('Failed to fetch recommendations:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

// 컴포넌트가 마운트될 때 추천 데이터 로드
onMounted(loadRecommendations);
</script>

<template>
  <section class="other-houses-section">
    <h3>이런 집은 어때요?</h3>
    <p>문인규님과 비슷한 성향을 가진 사람들이 선택한 집을 추천드립니다.</p>
    <div class="other-houses-list">
      <div 
        v-for="apartment in apartments" 
        :key="apartment.aptSeq" 
        class="house-card">
        <p><strong>{{ apartment.aptNm }}</strong></p>
        <p>{{ apartment.roadNm }} {{ apartment.roadNmBonbun }}</p>
        <p>건축 연도: {{ apartment.buildYear }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.other-houses-section {
  margin-bottom: 2rem;
}

.other-houses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.house-card {
  flex: 1;
  padding: 2rem;
  background-color: var(--color-one);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.house-card p {
  margin: 0.5rem 0;
}
</style>
