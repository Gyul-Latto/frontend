<script setup>
import { ref, onMounted } from "vue";
import { fetchSido, fetchRegionData } from "@/utils/searchUtils";

const sido = ref("");
const gugun = ref("");
const dong = ref("");
const amenities = ref([]);
const selectedAmenities = ref({
  station: "",
  convenienceStore: "",
  policeStation: "",
});

// 초기화
onMounted(() => {
  fetchSido();
  fetchAmenities();
});

// 시도 변경 시 구군 불러오기
const handleSidoChange = (event) => {
  const regcode = event.target.value.substr(0, 2) + "*00000";
  fetchRegionData(regcode, "gugun");
};

// 구군 변경 시 동 불러오기
const handleGugunChange = (event) => {
  const regcode = event.target.value.substr(0, 5) + "*";
  fetchRegionData(regcode, "dong");
};

// 어메니티 필터 값
const fetchAmenities = () => {
  amenities.value = [
    { id: "station", name: "역 거리", options: ["10분", "20분"] },
    { id: "convenienceStore", name: "편의점 거리", options: ["10분", "20분"] },
    { id: "policeStation", name: "경찰서 거리", options: ["10분", "20분"] },
  ];
};

// 검색 버튼 클릭 시
const handleSearch = () => {
  console.log("검색:", {
    sido: sido.value,
    gugun: gugun.value,
    dong: dong.value,
    amenities: selectedAmenities.value,
  });
};
</script>

<template>
  <div class="search-bar">
    <!-- 검색 영역 -->
    <div class="search-row">
      <select id="sido" v-model="sido" @change="handleSidoChange">
        <option value="">시도 선택</option>
      </select>
      <select id="gugun" v-model="gugun" @change="handleGugunChange">
        <option value="">구 선택</option>
      </select>
      <select id="dong" v-model="dong">
        <option value="">동 선택</option>
      </select>
      <button @click="handleSearch">검색</button>
    </div>

    <!-- 필터 바 -->
    <div class="filter-row">
      <select v-model="selectedAmenities.station">
        <option value="">역 거리</option>
        <option value="10분">10분</option>
        <option value="20분">20분</option>
      </select>
      <select v-model="selectedAmenities.convenienceStore">
        <option value="">편의점 거리</option>
        <option value="10분">10분</option>
        <option value="20분">20분</option>
      </select>
      <select v-model="selectedAmenities.policeStation">
        <option value="">경찰서 거리</option>
        <option value="10분">10분</option>
        <option value="20분">20분</option>
      </select>
    </div>
  </div>
</template>



<style src="@/styles/SearchBar.css"></style>
