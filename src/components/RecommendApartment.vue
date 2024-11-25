<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import ToggleApartment from "@/components/ToggleApartment.vue";

const recommendations = ref([]);
const authStore = useAuthStore();
const userStore = useUserStore();
const username = computed(() => userStore.userInfo?.username || '사용자');
const selectedApartment = ref(null);

const fetchRecommendations = async () => {
  try {
    if (!authStore.token) {
      console.error('사용자 토큰이 없습니다. 로그인이 필요합니다.');
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
      recommendations.value = response.data.data.reverse().slice(0, 4);
      console.log('추천 아파트:', recommendations.value);
    } else {
      console.error('추천 데이터를 가져오는 데 실패했습니다:', response.data.message);
    }
  } catch (error) {
    console.error('추천 데이터 요청 중 오류 발생:', error);
  }
};

const openDetailPage = (apartment) => {
  selectedApartment.value = apartment; // 상세페이지 표시
};

const closeDetailPage = () => {
  selectedApartment.value = null; // 상세페이지 닫기
};

onMounted(fetchRecommendations);
</script>

<template>
  <section class="recommend-section">
    <h3>{{ username }}님의 추천 아파트</h3>
    <p class="section-description">
      {{ username }}님이 좋아요 한 아파트를 분석하여 추천드립니다.
    </p>
    <div class="recommend-list">
      <div
        v-for="(apartment, index) in recommendations"
        :key="index"
        class="recommend-item"
        @click="openDetailPage(apartment)" 
      >
        <img :src="apartment.aptImg" alt="아파트" />
        <div class="recommend-info">
          <p class="apt-name">
            {{ apartment.umdNm }} <span class="apt-dong">- {{ apartment.aptNm }}</span>
          </p>
          <p class="apt-details">{{ apartment.description }}</p>
        </div>
      </div>
    </div>
    <p v-if="recommendations.length === 0">추천된 아파트가 없습니다.</p>

    <!-- 상세페이지 모달 -->
    <ToggleApartment
      v-if="selectedApartment"
      :apartment="selectedApartment"
      @close="closeDetailPage"
    />
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  width: 80%;
  max-width: 800px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90%;
}
</style>