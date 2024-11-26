<script setup>
import { ref, onMounted } from 'vue';
import { initializeMap, addMarkers, moveToLocation } from '@/utils/mapUtils';
const emit = defineEmits(['select-apartment']);
const map = ref(null);

// 지도 초기화
onMounted(() => {
  map.value = initializeMap('map');
  if (!map.value) {
    console.error('지도 객체 초기화 실패');
  } else {
    console.log('지도 초기화 완료:', map.value);
  }
});

// 마커 업데이트 메서드
const updateMarkers = async (newApartments) => {
  console.log('마커 업데이트:', newApartments);

  if (!map.value) {
    console.error('지도 객체가 초기화되지 않았습니다.');
    return;
  }

  // 마커 추가
  addMarkers(map.value, newApartments, (apartment) => {
    // 마커 클릭 시 지도 이동
    emit('select-apartment', apartment);
    moveToLocation(map.value, apartment.latitude, apartment.longitude);
  });
};

defineExpose({
  updateMarkers, // 외부에서 호출 가능하도록 공개
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