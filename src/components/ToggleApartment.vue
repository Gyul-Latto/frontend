<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import uncheckedImage from "../assets/images/icons/unlike.png";
import checkedImage from "../assets/images/icons/like.png";
import ApartmentDeals from "./ApartmentDeals.vue";
import axios from "axios";

const props = defineProps(["apartment"]);
const emit = defineEmits(["close"]);

const userStore = useUserStore();

const likeStatus = ref({});

const checkLikeStatus = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/apt/like`, {
      params: { userId: userStore.userInfo?.userId, aptSeq: props.apartment.aptSeq },
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    // 현재 아파트 ID에 따라 좋아요 상태를 저장
    likeStatus.value[props.apartment.aptSeq] = response.data.data;
  } catch (error) {
    console.error("좋아요 상태 확인 중 오류:", error);
  }
};

const toggleLike = async () => {
  try {
    const url = `http://localhost:8080/api/apt/like`;
    const headers = { Authorization: `Bearer ${userStore.token}` };

    if (likeStatus.value[props.apartment.aptSeq]) {
      // 좋아요 삭제
      await axios.delete(url, {
        params: { userId: userStore.userInfo?.userId, aptSeq: props.apartment.aptSeq },
        headers,
      });
    } else {
      // 좋아요 추가
      await axios.post(url, null, {
        params: { userId: userStore.userInfo?.userId, aptSeq: props.apartment.aptSeq },
        headers,
      });
    }

    // 상태 반전
    likeStatus.value[props.apartment.aptSeq] = !likeStatus.value[props.apartment.aptSeq];
  } catch (error) {
    console.error("좋아요 상태 변경 중 오류:", error);
  }
};

onMounted(() => {
  if (props.apartment && props.apartment.aptSeq) {
    checkLikeStatus();
  }
});
</script>

<template>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="detail-apartment" @click.stop>
        <!-- 닫기 버튼 -->
        <button class="close-btn" @click="$emit('close')">닫기</button>
  
        <!-- 이미지 -->
        <div class="image-container">
          <!-- 좋아요 버튼 -->
          <div class="like-button" @click="toggleLike">
            <img
              :src="likeStatus[apartment.aptSeq] ? checkedImage : uncheckedImage"
              alt="좋아요 상태"
            />
          </div>
          <img :src="props.apartment.aptImg" alt="아파트 이미지" class="apartment-image" />
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
  
        <!-- 거래 정보 -->
        <ApartmentDeals :apartment="apartment" />
      </div>
    </div>
  </template>
  
  <style scoped>
  /* 전체 화면을 덮는 오버레이 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  /* 상세 페이지 */
  .detail-apartment {
    width: 60%; /* 화면의 60% 넓이 */
    max-width: 800px; /* 최대 넓이 */
    height: auto; /* 내용에 따라 높이 조절 */
    max-height: 80%; /* 화면의 80% 높이 */
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto; /* 스크롤 가능 */
    position: relative;
    padding: 20px;
    box-sizing: border-box;
  }
  
  /* 닫기 버튼 */
  .close-btn {
    background-color: var(--color-four);
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  /* 이미지 */
  .image-container {
    margin-bottom: 20px;
    text-align: center;
    position: relative;
  }
  
  .apartment-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .apartment-main-info {
    margin-bottom: 20px;
  }
  
  .location {
    font-size: 1.2rem;
    color: #666;
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
    color: black;
  }
  
  .like-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 10;
  }
  
  .like-button img {
    width: 40px;
    height: 40px;
  }
  </style>
  