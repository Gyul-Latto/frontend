<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import ToggleApartment from '@/components/ToggleApartment.vue';
import { getPreviousHour, getYesterdayDate } from '@/utils/dateUtils';

const recommendedApartments = ref([]);
const authStore = useAuthStore();
const selectedApartment = ref(null);

const today = ref(getYesterdayDate(0));

const preHour = ref(parseInt(getPreviousHour(), 10));
const currHour = ref(preHour.value + 1);

const loadRecommendedApartments = async () => {
  try {
    // hour가 23일 경우 date를 하루 전으로 변경
    if (preHour.value === 23) {
      today.value = getYesterdayDate(1);
    }

    const response = await axios.get(
      `http://localhost:8080/api/views/date/${today.value}/hour/${preHour.value}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );

    if (response.data.statusCode === 200) {
      recommendedApartments.value = response.data.data.reverse().slice(0, 6);
      console.log(recommendedApartments.value);
    } else {
      console.error('클라이언트 오류:', response.data.message);
    }
  } catch (error) {
    console.error('백엔드 오류:', error);
  }
};

// 상세 페이지 닫기
const closeDetail = () => {
  selectedApartment.value = null;
};

onMounted(loadRecommendedApartments);

onMounted(() => {
  console.log('preHour:', preHour.value);
});
</script>

<template>
  <section class="cooperation-apartments">
    <h2>실시간 인기 아파트</h2>
    <p>
      최근 1시간 <b>({{ preHour }}시 ~ {{ currHour }}시)</b>을 기준으로 집계된 인기 아파트 입니다.
    </p>
    <div class="apartment-list" v-if="recommendedApartments.length > 0">
      <div
        v-for="(apartment, index) in recommendedApartments"
        :key="apartment.aptSeq"
        class="apartment-item"
        @click="selectedApartment = apartment"
      >
        <div class="ranking">
          <span>{{ index + 1 }}등</span>
        </div>
        <img :src="apartment.aptImg" alt="아파트 이미지" class="apartment-image" />
        <div class="apartment-info">
          <h2>{{ apartment.aptNm }}</h2>
          <p>
            주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{
              apartment.roadNmBubun
            }}
            ({{ apartment.umdNm }} {{ apartment.jibun }})
          </p>
          <p>면적: {{ apartment.excluUseAr }}㎡</p>
          <p>층수: {{ apartment.floor }}</p>
          <p>건축 연도: {{ apartment.buildYear }}</p>
          <p>특징: {{ apartment.description }}</p>
        </div>
      </div>
    </div>
    <p v-if="recommendedApartments.length === 0">실시간 인기 아파트가 없습니다.</p>
    <!-- 상세 페이지 -->
    <ToggleApartment v-if="selectedApartment" :apartment="selectedApartment" @close="closeDetail" />
  </section>
</template>

<style scoped>
.cooperation-apartments {
  padding: 2rem;
}

.apartment-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
}

.apartment-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
}

.apartment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.ranking {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-two);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-bottom-right-radius: 8px;
  z-index: 1;
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
