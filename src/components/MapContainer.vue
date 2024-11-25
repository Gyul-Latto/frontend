<script setup>
import { ref, watch, onMounted } from 'vue';
import { initializeMap, addMarkers, moveToLocation } from '@/utils/mapUtils';

const map = ref(null);

const apartments = defineProps(['apartments']);
const emit = defineEmits(['select-apartment']);

// 지도 초기화
onMounted(() => {
  map.value = initializeMap('map');
  if (!map.value) {
    console.error('지도 객체 초기화 실패');
  } else {
    console.log('지도 초기화 완료:', map.value);
  }
});

// 아파트 목록이 변경될 때 마커 갱신
watch(apartments, (newApartments) => {
  console.log('watch 실행됨: ', newApartments);

  if (!map.value) {
    console.error('지도 객체가 초기화되지 않았습니다.');
    return;
  }
  const apartmentArray = newApartments.apartments || [];

  if (!Array.isArray(apartmentArray)) {
    console.error('전달된 apartments.apartments가 배열이 아닙니다:', apartmentArray);
    return;
  }

  addMarkers(map.value, apartmentArray, (apartment) => {
    emit('select-apartment', apartment);
    // 마커 클릭 시 지도 이동
    moveToLocation(map.value, apartment.latitude, apartment.longitude);
  });
});

// 특정 아파트로 이동
const moveToApartment = (apartment) => {
  if (!map.value) {
    console.error('지도 객체가 초기화되지 않았습니다.');
    return;
  }

  if (!apartment || !apartment.latitude || !apartment.longitude) {
    console.error('유효하지 않은 아파트 정보:', apartment);
    return;
  }

  moveToLocation(map.value, apartment.latitude, apartment.longitude);
};
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
