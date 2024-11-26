<script setup>
import { ref } from 'vue';
import MapSearchBar from '@/components/MapSearchBar.vue';
import MapContainer from '@/components/MapContainer.vue';
import DetailApartment from '@/components/DetailApartment.vue';

const apartments = ref([]);
const selectedApartment = ref(null);
const mapRef = ref(null); // 지도 컴포넌트 참조

// 검색 결과를 업데이트
const handleSearchResults = (results) => {
  console.log('검색 결과:', results);

  // 리스트와 마커를 동시에 업데이트
  apartments.value = results;

  // 지도 컴포넌트에 데이터 전달
  if (mapRef.value) {
    mapRef.value.updateMarkers(results); // 커스텀 함수 호출
  }
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
      <MapContainer ref="mapRef" :apartments="apartments" @select-apartment="handleSelectApartment" />
    </div>
  </div>
</template>

<style scoped>
.search-bar-container
{
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.detail-container{
  
}
.map-view {
  display: flex;
  height: 100vh; 
}

.map-container {
  flex: 3;
  position: relative;
}
</style>
