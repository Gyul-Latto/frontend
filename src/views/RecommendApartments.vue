<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const recommendedApartments = ref([]);
const authStore = useAuthStore();

const loadRecommendedApartments = async () => {
  try {
    if (!authStore.token) {
      console.error("사용자 토큰이 없습니다. 로그인이 필요합니다.");
      return;
    }

    const response = await axios.get('http://localhost:8080/api/recommend', {
      headers: {
        Authorization: `Bearer ${authStore.token}`, 
      },
      params: {
        recommendationType: 'personalization',
      },
    });

    if (response.data.statusCode === 200) {
      recommendedApartments.value = response.data.data.reverse().slice(0, 10);
      console.log(recommendedApartments.value);
    } else {
      console.error('Failed to load recommended apartments:', response.data.message);
    }
  } catch (error) {
    console.error('Error loading recommended apartments:', error);
  }
};

onMounted(loadRecommendedApartments);
</script>

<template>
  <section class="recommended-apartments">
    <h1>추천 아파트</h1>
    <div class="apartment-list" v-if="recommendedApartments.length > 0">
      <div 
        v-for="apartment in recommendedApartments" 
        :key="apartment.aptSeq" 
        class="apartment-item"
      >
        <img :src="apartment.aptImg" alt="아파트 이미지" class="apartment-image" />
        <div class="apartment-info">
          <h2>{{ apartment.aptNm }}</h2>
          <p>주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{ apartment.roadNmBubun }}</p>
          <p>지번: {{ apartment.umdNm }} {{ apartment.jibun }}</p>
          <p>면적: {{ apartment.excluUseAr }}㎡</p>
          <p>층수: {{ apartment.floor }}</p>
          <p>건축 연도: {{ apartment.buildYear }}</p>
          <p>설명: {{ apartment.description }}</p>
        </div>
      </div>
    </div>
    <p v-else>추천된 아파트가 없습니다.</p>
  </section>
</template>

<style scoped>
.recommended-apartments {
  padding: 2rem;
}

.apartment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.apartment-item {
  flex: 1 1 calc(33.333% - 1rem);
  max-width: calc(33.333% - 1rem);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.apartment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.apartment-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.apartment-info {
  padding: 1rem;
  font-size: 0.9rem;
}

.apartment-info h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}
</style>
