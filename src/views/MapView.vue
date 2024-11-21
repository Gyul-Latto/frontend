<script setup>
import { ref, onMounted } from "vue";
import { initializeMap } from "@/utils/mapUtils";
import SearchBar from "@/components/MapSearchBar.vue";

// const map = ref(null);
onMounted(() => {
  // const mapElementId = "map";
  // map.value = initializeMap(mapElementId);
  // console.log("지도 초기화 완료:", map.value);
});

</script>

<template>
  <div class="map-view">
    <div id="search-container">
      <SearchBar />
    </div>
    <div id="map-container">
      <div id="map"></div>
    </div>
  </div>
</template>

<style scoped>
.map-view {
  display: flex;
  height: auto;
  height: 100vh;
}

#map-container {
  flex: 1;
  /* position: relative;
  width: auto;
  min-height: 100vh;
  height: auto; */
  height: calc(100vh - 60px);
}

#map {
  width: 100%;
  height: 100%;
}
</style>

