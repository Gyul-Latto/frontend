<script setup>
const props = defineProps(["apartment"]);
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="detail-apartment">
    <!-- 닫기 버튼 -->
    <button class="close-btn" @click="$emit('close')">닫기</button>

    <!-- 단일 이미지 -->
    <div class="image-container">
      <img :src="apartment.aptImg" alt="아파트 이미지" class="apartment-image" />
    </div>

    <!-- 주요 정보 -->
    <div class="apartment-main-info">
      <h2>{{ apartment.aptNm }}</h2>
      <p class="location">주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{ apartment.roadNmBubun }}</p>
      <p>면적: {{ apartment.excluUseAr }}m² | 층수: {{ apartment.floor }}</p>
    </div>

    <!-- 상세 설명 -->
    <div class="apartment-details">
      <h3>상세 설명</h3>
      <p>{{ apartment.description }}</p>
    </div>

    <!-- 추가 정보 -->
    <div class="additional-info">
      <h3>건물 정보</h3>
      <ul>
        <li>건축 연도: {{ apartment.buildYear }}</li>
        <li>지번: {{ apartment.umdNm }} {{ apartment.jibun }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.detail-apartment {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 스크롤 활성화 */
  height: 100%; /* 부모 컨테이너 높이 채우기 */
  box-sizing: border-box;
}

.close-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.image-container {
  margin-bottom: 20px;
  text-align: center;
}

.apartment-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.apartment-main-info {
  margin-bottom: 20px;
}

.location {
  font-size: 1.2rem;
  color: #666;
}

.apartment-details {
  margin-bottom: 20px;
}

.additional-info ul {
  list-style: none;
  padding: 0;
}

.additional-info li {
  margin-bottom: 10px;
  padding-left: 10px;
  position: relative;
}

.additional-info li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #007bff;
}
</style>
