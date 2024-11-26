<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import ToggleApartment from '@/components/ToggleApartment.vue'; // 상세페이지 컴포넌트

const apartments = ref([]);
const authStore = useAuthStore();
const userStore = useUserStore();
const username = computed(() => userStore.userInfo?.username || '사용자');
const selectedApartment = ref(null); // 선택된 아파트 데이터

const loadRecommendations = async () => {
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
        recommendationType: 'cooperation',
      },
    });

    if (response.data.statusCode === 200) {
      apartments.value = response.data.data.reverse().slice(0, 2); // 추천 데이터 로드
      console.log(apartments.value);
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error('추천 데이터를 로드하는 중 오류 발생:', error);
  }
};

const openDetailPage = (apartment) => {
  selectedApartment.value = apartment; // 상세페이지 열기
};

const closeDetailPage = () => {
  selectedApartment.value = null; // 상세페이지 닫기
};

onMounted(loadRecommendations);
</script>

<template>
  <section class="other-houses-section">
    <h3>이런 집은 어때요?</h3>
    <p class="section-description">
      {{ username }}님과 비슷한 성향을 가진 사람들이 선택한 집을 추천드립니다.
    </p>
    <div class="other-houses-list">
      <div
        v-for="apartment in apartments"
        :key="apartment.aptSeq"
        class="house-card"
        @click="openDetailPage(apartment)"
      >
        <img :src="apartment.aptImg" alt="아파트 이미지" class="house-image" />
        <div class="house-info">
          <p class="house-title">
            {{ apartment.umdNm }} - <strong>{{ apartment.aptNm }}</strong>
          </p>
          <p class="house-description">{{ apartment.description }}</p>
        </div>
      </div>
    </div>
    <p v-if="apartments.length === 0">추천된 아파트가 없습니다.</p>

    <!-- 상세페이지 모달 -->
    <ToggleApartment
      v-if="selectedApartment"
      :apartment="selectedApartment"
      @close="closeDetailPage"
    />
  </section>
</template>

<style scoped>
.other-houses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  justify-content: space-between;
}

.house-card {
  flex: 1 1 calc(20% - 1rem);
  background-color: var(--color-one);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  padding: 1.5rem;
  cursor: pointer; /* 클릭 가능하도록 포인터 추가 */
}

.house-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.house-image {
  width: 100%;
  height: 350px;
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
