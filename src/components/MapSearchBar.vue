<script setup>
import { ref, onMounted } from "vue";
import { fetchSido, fetchRegionData, fetchApartments } from "@/utils/searchUtils";

const emit = defineEmits(["search"]);

const sido = ref("");
const gugun = ref("");
const dong = ref("");
const apartments = ref([]);
const sidoOptions = ref([]);
const gugunOptions = ref([]);
const dongOptions = ref([]);

// 시도 데이터 초기화
onMounted(async () => {
  try {
    const regions = await fetchSido();
    sidoOptions.value = regions; // [{ code: "1100000000", name: "서울특별시" }, ...]
  } catch (error) {
    console.error("Failed to fetch sido data:", error);
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
    const regcode = sido.value.substr(0, 2) + "*00000"; // 시도 코드
    const regions = await fetchRegionData(regcode, "gugun");
    gugunOptions.value = regions;
  } catch (error) {
    console.error("Failed to fetch gugun data:", error);
  }
};

// 구군 변경 시 동 데이터 가져오기
const handleGugunChange = async () => {
  if (!gugun.value) {
    dongOptions.value = [];
    return;
  }
  try {
    const regcode = gugun.value.substr(0, 5) + "*"; // 구군 코드
    const regions = await fetchRegionData(regcode, "dong");
    dongOptions.value = regions;
  } catch (error) {
    console.error("Failed to fetch dong data:", error);
  }
};

// 검색 실행
const handleSearch = async () => {
  try {
    const sidoName = sidoOptions.value.find(option => option.code === sido.value)?.name || '';
    const gugunName = gugunOptions.value.find(option => option.code === gugun.value)?.name || '';
    const dongName = dongOptions.value.find(option => option.code === dong.value)?.name || '';

    apartments.value = await fetchApartments(sidoName, gugunName, dongName);

    // 검색 결과를 부모로 전달
    emit("search", apartments.value);
    
  } catch (error) {
    console.error("Failed to fetch apartments data:", error);
  }
};
</script>

<template>
  <div class="search-bar">
    <!-- 검색 폼 -->
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

    <!-- 검색 결과 -->
    <div class="search-results" v-if="apartments.length > 0">
      <h3>아파트 검색 결과</h3>
      <ul>
        <li
            v-for="apartment in apartments"
            :key="apartment.aptSeq"
            class="apartment-card"
            @click="$emit('select-apartment', apartment)"
          >
            <img :src="apartment.aptImg" alt="아파트 이미지" class="apartment-img" />
            <div class="apartment-info">
              <strong class="apartment-title">{{ apartment.aptNm }}</strong>
              <p class="apartment-location">{{ apartment.umdNm }}</p>
              <p class="apartment-details">
                <span>{{ apartment.excluUseAr }}m²</span> | <span>{{ apartment.floor }}층</span>
              </p>
              <p class="apartment-description">{{ apartment.description }}</p>
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