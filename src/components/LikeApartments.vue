<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import ToggleApartment from "@/components/ToggleApartment.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const likedApartments = ref([]);
const selectedApartment = ref(null); 

// 좋아요 아파트 목록 로드
const loadLikedApartments = async () => {
  try {
    const userId = userStore.userInfo?.userId;
    if (!userId) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    const response = await axios.get(`http://localhost:8080/api/apt/like/${userId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.data.statusCode === 200) {
      console.log(response.data.data);
      likedApartments.value = response.data.data; // 좋아요 목록 저장
    } else {
      console.error('좋아요 아파트를 불러오는 데 실패했습니다:', response.data.message);
    }
  } catch (error) {
    console.error('좋아요 아파트 데이터를 로드하는 중 오류 발생:', error);
  }
};

// 상세 페이지 닫기
const closeDetail = () => {
  selectedApartment.value = null;
};

// 아파트 카드 클릭 시 상세 페이지 표시
const showDetail = (apartment) => {
  selectedApartment.value = apartment;
};

onMounted(loadLikedApartments);
</script>

<template>
  <section class="liked-apartments">
    <h1>좋아요를 누른 아파트</h1>
    <div class="apartment-list">
      <div
        v-for="apartment in likedApartments"
        :key="apartment.aptSeq"
        class="apartment-item"
        @click="showDetail(apartment)"
      >
        <img :src="apartment.aptImg || '@/assets/images/sampleApartment.jpeg'" alt="아파트 이미지" class="apartment-image" />
        <div class="apartment-info">
          <h2 class="apt-name">{{ apartment.aptNm }}</h2>
          <p class="apt-description">{{ apartment.description }}</p>
          <p>주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{ apartment.roadNmBubun }} ({{ apartment.umdNm }} {{ apartment.jibun }})</p>
          <p>면적: {{ apartment.excluUseAr }}㎡</p>
          <p>층수: {{ apartment.floor }}</p>
          <p>건축 연도: {{ apartment.buildYear }}</p>
        </div>
      </div>
    </div>
    <!-- 상세 페이지 -->
    <ToggleApartment 
      v-if="selectedApartment" 
      :apartment="selectedApartment" 
      @close="closeDetail" 
    />
  </section>
</template>

<style scoped>
.liked-apartments {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.apartment-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.apartment-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.apartment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.apartment-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.apartment-info {
  padding: 1rem;
  text-align: left;
}

.apt-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.apt-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}
</style>
