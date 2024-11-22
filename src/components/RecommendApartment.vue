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
      recommendations.value = response.data.data.reverse().slice(0, 4);
      console.log(recommendations.value);
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
  border: 2px solid #ddd; /* 테두리 추가 */
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s; /* 클릭 가능 효과 */
  cursor: pointer; /* 클릭 가능 커서 */
}

.recommend-item:hover {
  transform: translateY(-5px); /* 호버 시 상승 효과 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 */
}

.recommend-item img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.recommend-info {
  padding: 1rem;
  text-align: center; /* 중앙 정렬 */
}

.apt-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333; 
}

.apt-details {
  font-size: 0.9rem;
  color: #555; /* 내용 색상 */
  margin-top: 1rem; /* 간격 추가 */
  text-align: center; /* 내용 중앙 정렬 */
}
</style>