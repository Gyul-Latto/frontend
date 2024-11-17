<script setup>
import { ref, onMounted } from "vue";
import { fetchSido, fetchRegionData } from "@/utils/searchUtils";

const sido = ref("");
const gugun = ref("");
const dong = ref("");

// 초기화
onMounted(() => {
  fetchSido();
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

// 검색 버튼 클릭 시
const handleSearch = () => {
  console.log("검색:", { sido: sido.value, gugun: gugun.value, dong: dong.value });
};
</script>

<template>
  <div class="search-bar">
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
  </div>
</template>

<style src="@/styles/SearchBar.css"></style>
