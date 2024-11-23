<script setup>
import { ref } from 'vue';
import MapSearchBar from '@/components/MapSearchBar.vue';
import MapContainer from '@/components/MapContainer.vue';
import DetailApartment from '@/components/DetailApartment.vue';

const apartments = ref([]);
const selectedApartment = ref(null);

// 검색 결과를 업데이트
const handleSearchResults = (results) => {
  console.log('검색 결과:', results);
  apartments.value = results;
};

// 아파트 선택
const handleSelectApartment = (apartment) => {
  console.log('선택된 아파트:', apartment);
  selectedApartment.value = apartment;
};

// 상세보기 닫기
const handleCloseDetail = () => {
  selectedApartment.value = null;
};
</script>

<template>
  <div class="map-view">
    <!-- 검색 바 -->
    <div class="search-bar-container">
      <MapSearchBar @search="handleSearchResults" @select-apartment="handleSelectApartment" />
    </div>
    <!-- 상세보기 -->
    <div class="detail-container" v-if="selectedApartment">
      <DetailApartment :apartment="selectedApartment" @close="handleCloseDetail" />
    </div>
    <!-- 지도 -->
    <div class="map-container">
      <MapContainer :apartments="apartments" @select-apartment="handleSelectApartment" />
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.map-view {
  display: flex;
  height: 100vh; /* 전체 화면 사용 */
}

.map-container {
  flex: 3;
  position: relative;
}
</style>
