<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  fetchSido,
  fetchRegionData,
  fetchApartments,
  fetchApartmentsBySearchQuery,
} from '@/utils/searchUtils';

const emit = defineEmits(['search']);
const route = useRoute();
const router = useRouter();

const sido = ref('');
const gugun = ref('');
const dong = ref('');
const apartments = ref([]);
const sidoOptions = ref([]);
const gugunOptions = ref([]);
const dongOptions = ref([]);
const searchQuery = ref(''); // 아파트 검색어 초기화

const selectedApartment = ref(null);

// 시도 데이터 초기화
onMounted(async () => {
  try {
    const regions = await fetchSido();
    sidoOptions.value = regions;
  } catch (error) {
    console.error('Failed to fetch sido data:', error);
  }
});

// 시도 변경 시 구군 데이터 가져오기
const handleSidoChange = async () => {
  if (!sido.value) {
    gugunOptions.value = [];
    dongOptions.value = [];
    return;
  }
  try {
    const regcode = sido.value.substr(0, 2) + '*00000'; // 시도 코드
    const regions = await fetchRegionData(regcode, 'gugun');
    gugunOptions.value = regions;
  } catch (error) {
    console.error('Failed to fetch gugun data:', error);
  }
};

// 구군 변경 시 동 데이터 가져오기
const handleGugunChange = async () => {
  if (!gugun.value) {
    dongOptions.value = [];
    return;
  }
  try {
    const regcode = gugun.value.substr(0, 5) + '*'; // 구군 코드
    const regions = await fetchRegionData(regcode, 'dong');
    dongOptions.value = regions;
  } catch (error) {
    console.error('Failed to fetch dong data:', error);
  }
};

// 시군동 검색 실행
const handleRegionSearch = async () => {
  try {
    const sidoName = sidoOptions.value.find((option) => option.code === sido.value)?.name || '';
    const gugunName = gugunOptions.value.find((option) => option.code === gugun.value)?.name || '';
    const dongName = dongOptions.value.find((option) => option.code === dong.value)?.name || '';

    if (!sidoName && !gugunName && !dongName) {
      console.warn('지역 정보가 입력되지 않았습니다.');
      apartments.value = [];
      return;
    }

    apartments.value = await fetchApartments(sidoName, gugunName, dongName);
    emit('search', apartments.value); // 검색 결과 전달
  } catch (error) {
    console.error('Failed to fetch apartments data:', error);
  }
};

// 아파트 이름 검색 실행
const handleNameSearch = async () => {
  if (!searchQuery.value.trim()) {
    console.warn('검색어가 없습니다.');
    apartments.value = [];
    return;
  }

  try {
    apartments.value = await fetchApartmentsBySearchQuery(searchQuery.value.trim());
    emit('search', apartments.value); // 검색 결과 전달
  } catch (error) {
    console.error('Failed to fetch apartments by name:', error);
  }
};

// 쿼리 파라미터를 기반으로 아파트 검색 실행
const fetchSearchResults = async (query) => {
  if (!query) {
    console.warn('검색어가 없습니다.');
    apartments.value = [];
    return;
  }

  try {
    apartments.value = await fetchApartmentsBySearchQuery(query);
    console.log('검색 결과:', apartments.value);
  } catch (error) {
    console.error('아파트 검색 중 오류 발생:', error);
  }
};

// 라우트 변경 시 또는 페이지 로드 시 검색 결과 로드
onMounted(() => {
  fetchSearchResults(route.query.q);
});

watch(
  () => route.query.q,
  (newQuery) => {
    fetchSearchResults(newQuery);
  },
);

// 아파트 상세 페이지 이동
const goToApartmentDetail = (apartmentId) => {
  router.push({ path: `/apartment/${apartmentId}` });
};
</script>

<template>
  <div class="search-bar">
    <!-- 시군동 검색 -->
    <div class="region-search-row">
      <select v-model="sido" @change="handleSidoChange">
        <option value="">시도 선택</option>
        <option v-for="option in sidoOptions" :key="option.code" :value="option.code">
          {{ option.name }}
        </option>
      </select>

      <select v-model="gugun" @change="handleGugunChange" :disabled="!sido">
        <option value="">구군 선택</option>
        <option v-for="option in gugunOptions" :key="option.code" :value="option.code">
          {{ option.name }}
        </option>
      </select>

      <select v-model="dong" :disabled="!gugun">
        <option value="">동 선택</option>
        <option v-for="option in dongOptions" :key="option.code" :value="option.code">
          {{ option.name }}
        </option>
      </select>

      <button @click="handleRegionSearch" :disabled="!dong">검색</button>
    </div>

    <!-- 아파트 이름 검색 -->
    <div class="name-search-row">
      <input
        class="search-input"
        type="text"
        placeholder="아파트 이름 검색"
        v-model="searchQuery"
      />
      <button @click="handleNameSearch">검색</button>
    </div>

    <!-- 검색 결과 -->
    <div class="search-results" v-if="apartments.length > 0">
      <h3>아파트 검색 결과</h3>
      <ul>
        <li
          v-for="apartment in apartments"
          :key="apartment.aptSeq"
          class="apartment-card"
          @click="$emit('select-apartment', apartment)"
          style="cursor: pointer"
        >
          <img :src="apartment.aptImg" alt="아파트 이미지" class="apartment-img" />
          <div class="apartment-info">
            <strong class="apartment-title">{{ apartment.aptNm }}</strong>
            <p class="apartment-location">{{ apartment.umdNm }}</p>
            <p class="apartment-details">
              <span>{{ apartment.excluUseAr }}m²</span> | <span>{{ apartment.floor }}층</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<style src="@/styles/MapSearchBar.css"></style>
