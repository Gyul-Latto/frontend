<script setup>
import { ref, watch, onMounted } from 'vue';
import { initializeMap, addMarkers } from '@/utils/mapUtils';

const map = ref(null);
const apartments = defineProps(['apartments']); // 부모로부터 apartments를 prop으로 받음

// 지도 초기화
onMounted(() => {
  map.value = initializeMap('map');
  if (!map.value) {
    console.error('지도 객체 초기화 실패');
  } else {
    console.log('지도 초기화 완료:', map.value);
  }
});

watch(apartments, (newApartments) => {
  console.log('watch 실행됨: ', newApartments);

  if (!map.value) {
    console.error('지도 객체가 초기화되지 않았습니다.');
    return;
  }

  if (!newApartments || !newApartments.apartments || newApartments.apartments.length === 0) {
    console.warn('지도 업데이트를 위한 데이터가 없습니다.');
    return;
  }

  console.log('addMarkers 호출 준비 완료: ', newApartments.apartments);
  addMarkers(map.value, newApartments.apartments);
});
</script>

<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
