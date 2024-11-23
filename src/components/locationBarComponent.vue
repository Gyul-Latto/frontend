<script setup>
import { ref, onMounted, watch } from 'vue';
import { fetchSido, fetchRegionData } from '@/utils/searchUtils';

const emit = defineEmits(['search']);

const sido = ref('');
const gugun = ref('');
const dong = ref('');
const sidoOptions = ref([]);
const gugunOptions = ref([]);
const dongOptions = ref([]);

watch(dong, (newDong) => {
  emit('dong-changed', newDong);
});

// 시도 데이터 초기화
onMounted(async () => {
  try {
    const regions = await fetchSido();
    sidoOptions.value = regions; // [{ code: "1100000000", name: "서울특별시" }, ...]
  } catch (error) {
    console.error('Failed to fetch sido data:', error);
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
    const regcode = sido.value.substr(0, 2) + '*00000'; // 시도 코드
    const regions = await fetchRegionData(regcode, 'gugun');
    gugunOptions.value = regions;
  } catch (error) {
    console.error('Failed to fetch gugun data:', error);
  }
};

// 구군 변경 시 동 데이터 가져오기
const handleGugunChange = async () => {
  if (!gugun.value) {
    dongOptions.value = [];
    return;
  }
  try {
    const regcode = gugun.value.substr(0, 5) + '*'; // 구군 코드
    const regions = await fetchRegionData(regcode, 'dong');
    dongOptions.value = regions;
  } catch (error) {
    console.error('Failed to fetch dong data:', error);
  }
};
</script>

<template>
  <!-- <div class="location-bar"> -->
  <div class="location-row">
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
  </div>
  <!-- </div> -->
</template>

<style scope>
/* .location-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: solid 1px #c4c7ca;
  border-radius: 10px;
} */

/* 검색 영역 */
.location-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

.location-row select {
  flex: 1;
  min-width: 90px;
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid var(--color-boarder);
  border-radius: 5px;
  background-color: #f8f8f8;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
}
</style>
