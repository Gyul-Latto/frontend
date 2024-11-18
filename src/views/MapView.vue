<script setup>
import { ref, onMounted } from "vue";
import { initializeMap } from "@/utils/mapUtils";
import SearchBar from "@/components/MapSearchBar.vue";

const map = ref(null);

// 지도 초기화
onMounted(() => {
  map.value = initializeMap("map");
});
</script>

<template>
  <div class="map-view">
    <!-- 왼쪽 검색 바 -->
    <div id="search-container">
      <SearchBar />
    </div>

    <!-- 오른쪽 지도 -->
    <div id="map-container">
      <div id="map"></div>
    </div>
  </div>
</template>

<style scoped>
.map-view {
  display: flex; 
  height: 100vh; 
}

#map-container {
  flex: 1; 
  position: relative;
}

#map {
  width: 100%;
  height: 100%; 
}
</style>
