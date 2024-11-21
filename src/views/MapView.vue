<script setup>
import { ref } from "vue";
import MapSearchBar from "@/components/MapSearchBar.vue";
import MapContainer from "@/components/MapContainer.vue";

const apartments = ref([]);

// 검색 결과를 업데이트
const handleSearchResults = (results) => {
  console.log("검색 결과:", results);
  apartments.value = results;
};
</script>

<template>
  <div class="map-view">
    <div class="search-bar-container">
      <MapSearchBar @search="handleSearchResults" />
    </div>
    <div class="map-container">
      <MapContainer :apartments="apartments" />
    </div>
  </div>
</template>

<style scoped>
.map-view {
  display: flex;
  height: 100vh; /* 전체 화면 사용 */
}

.map-container {
  flex: 3;
  position: relative;
}

::v-deep(.kakao-info-window) {
  display: block !important;
  visibility: visible !important;
  z-index: 1000 !important;
  opacity: 1 !important;
}
</style>
