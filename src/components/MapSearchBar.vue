<script setup>
import { ref, onMounted } from "vue";
import { fetchSido, fetchRegionData, fetchApartments } from "@/utils/searchUtils";
import { initializeMap, addMarkers } from "@/utils/mapUtils";

const sido = ref("");
const gugun = ref("");
const dong = ref("");
const apartments = ref([]);
const sidoOptions = ref([]);
const gugunOptions = ref([]);
const dongOptions = ref([]);
const map = ref(null);

// 지도 초기화
onMounted(() => {
  map.value = initializeMap("map");
  if (!map.value) {
    console.error("지도 객체 초기화 실패");
  } else {
    console.log("지도 초기화 완료:", map.value);
  }
});

// 시도 데이터 초기화
onMounted(async () => {
  try {
    const regions = await fetchSido();
    sidoOptions.value = regions;
  } catch (error) {
    console.error("시도 데이터를 가져오는 중 오류 발생:", error);
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
    const regcode = sido.value.substr(0, 2) + "*00000";
    const regions = await fetchRegionData(regcode, "gugun");
    gugunOptions.value = regions;
  } catch (error) {
    console.error("구군 데이터를 가져오는 중 오류 발생:", error);
  }
};

// 구군 변경 시 동 데이터 가져오기
const handleGugunChange = async () => {
  if (!gugun.value) {
    dongOptions.value = [];
    return;
  }
  try {
    const regcode = gugun.value.substr(0, 5) + "*";
    const regions = await fetchRegionData(regcode, "dong");
    dongOptions.value = regions;
  } catch (error) {
    console.error("동 데이터를 가져오는 중 오류 발생:", error);
  }
};

// 검색 실행
const handleSearch = async () => {
  try {
    const sidoName = sidoOptions.value.find((option) => option.code === sido.value)?.name || "";
    const gugunName = gugunOptions.value.find((option) => option.code === gugun.value)?.name || "";
    const dongName = dongOptions.value.find((option) => option.code === dong.value)?.name || "";

    apartments.value = await fetchApartments(sidoName, gugunName, dongName);

    if (!map.value) {
      console.error("지도 객체가 초기화되지 않았습니다.");
      return;
    }

    if (apartments.value.length > 0) {
      console.log("검색된 아파트 데이터:", apartments.value);
      addMarkers(map.value, apartments.value); // 마커 추가
    } else {
      console.warn("아파트 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("아파트 데이터를 가져오는 중 오류 발생:", error);
  }
};
</script>

<template>
  <div class="search-bar">
    <div class="search-row">
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

      <button @click="handleSearch" :disabled="!dong">검색</button>
    </div>

    <div class="search-results" v-if="apartments.length > 0">
      <h3>아파트 검색 결과</h3>
      <ul>
        <li v-for="apartment in apartments" :key="apartment.aptSeq">
          <strong>{{ apartment.aptNm }}</strong>
          <p>주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}</p>
          <p>건축년도: {{ apartment.buildYear }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>


<style scoped>
.search-results {
  margin-top: 20px;
}
</style>


<style src="@/styles/MapSearchBar.css"></style>