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
      apartments.value = response.data.data.reverse().slice(0, 2);
      console.log(apartments.value);
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
    <p class="section-description">문인규님과 비슷한 성향을 가진 사람들이 선택한 집을 추천드립니다.</p>
    <div class="other-houses-list">
      <div 
        v-for="apartment in apartments" 
        :key="apartment.aptSeq" 
        class="house-card">
        <img :src="apartment.aptImg" alt="아파트 이미지" class="house-image" />
        <div class="house-info">
          <p class="house-title">{{ apartment.umdNm }} - <strong>{{ apartment.aptNm }}</strong></p>
          <p class="house-description">{{ apartment.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.other-houses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5rem; /* 간격을 적당히 유지 */
  justify-content: space-between; /* 가로 정렬 */
}

.house-card {
  flex: 1 1 calc(20% - 1rem); /* 컨테이너 너비를 줄임 */
  background-color: var(--color-one);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1.5rem; /* 컨테이너 높이 줄임 */
}

.house-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.house-image {
  width: 100%; /* 사진 너비를 유지 */
  height: 350px; /* 사진 높이를 줄임 */
  object-fit: cover;
  margin: 0 auto 0.1rem auto;
  border-radius: 8px;
}

.house-info {
  padding: 0.3rem 0 0 0;
}

.house-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.house-description {
  font-size: 0.9rem;
  color: #666;
}

</style>
