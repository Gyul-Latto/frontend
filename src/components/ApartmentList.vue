<script setup>
import { defineProps } from "vue";

defineProps({
  apartments: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="apartment-list">
    <div v-if="apartments.length === 0">검색 결과가 없습니다.</div>
    <div v-else>
      <h3>아파트 목록</h3>
      <ul>
        <li v-for="apartment in apartments" :key="apartment.aptSeq">
          <h4>{{ apartment.aptNm }}</h4>
          <p>{{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{ apartment.roadNmBubun }}</p>
          <p>건축 연도: {{ apartment.buildYear }}</p>
          <p>위치: {{ apartment.latitude }}, {{ apartment.longitude }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.apartment-list {
  margin-top: 20px;
}

.apartment-list ul {
  list-style: none;
  padding: 0;
}

.apartment-list li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
