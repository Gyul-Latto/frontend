<script setup>
import { ref, computed } from 'vue';
import { fetchApartmentsBySearchQuery } from "@/utils/searchUtils";

const searchQuery = ref("");
const apartments = ref([]);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    console.warn("검색어를 입력하세요!");
    return;
  }

  try {
    apartments.value = await fetchApartmentsBySearchQuery(searchQuery.value);
    console.log("검색 결과:", apartments.value);
    router.push({ path: "/map", query: { q: searchQuery.value } }); // 검색어로 이동
  } catch (error) {
    console.error("검색 결과를 가져오는 중 오류:", error);
  }
};

</script>

<template>
  <div class="main-search-bar">
    <div class="location">
      <span>📍 대한민국</span>
    </div>
    <input
      class="search-input"
      type="text"
      placeholder="아파트를 검색해주세요"
      v-model="searchQuery"
    />
    <button 
      class="search-button" 
      @click="handleSearch" 
      :disabled="!searchQuery.trim()">검색🔍
    </button>
  </div>
</template>

<style scoped>
.main-search-bar {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--color-two);
  border-radius: 20px;
  color: var(--color-four);
  font-weight: bold;
  white-space: nowrap;
}

/* 검색 입력창 */
.search-input {
  flex: 2;
  height: 50px;
  padding: 0 1rem;
  border: 1px solid var(--color-boarder);
  border-radius: 15px;
  font-size: 1rem;
  box-sizing: border-box;
}

.search-button {
  flex: 0 0 auto;
  padding: 0.5rem 1rem;
  background-color: var(--color-two);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: var(--color-three);
}

.search-button:active {
  background-color: var(--color-two);
}
</style>