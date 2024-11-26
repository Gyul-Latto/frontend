<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from "@/stores/user";
import uncheckedImage from "../assets/images/icons/unlike.png";
import checkedImage from "../assets/images/icons/like.png";
import ApartmentDeals from "./ApartmentDeals.vue";
import axios from "axios";

const props = defineProps(["apartment"]);
const emit = defineEmits(["close"]);

const userStore = useUserStore();
const authStore = useAuthStore();

const likeStatus = ref({});

const checkLikeStatus = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/apt/like`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
      params: { userId: userStore.userInfo?.userId, aptSeq: props.apartment.aptSeq },
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
  <div class="detail-apartment">
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
      <p>면적: {{ apartment.excluUseAr }}m² | 층수: {{ apartment.floor }}</p>
    </div>

    <!-- 상세 설명 -->
    <div class="apartment-details">
      <h3>{{ apartment.description }}</h3>
    </div>

    <!-- 추가 정보 -->
    <div class="additional-info">
      <h3>건물 정보</h3>
      <ul>
        <li>면적: {{ apartment.excluUseAr }}m² </li>
            <li> 총 층수: {{ apartment.floor }} </li>
            <li>건축 연도: {{ apartment.buildYear }}</li>
            <li>주소: {{ apartment.roadNm }} {{ apartment.roadNmBonbun }}-{{ apartment.roadNmBubun }} ({{ apartment.umdNm }} {{ apartment.jibun }})</li>
      </ul>
    </div>

    <!-- 거래 정보 -->
    <ApartmentDeals :apartment="apartment" />
  </div>
</template>


<style scoped>
/* 기존 스타일 그대로 유지 */
.detail-apartment {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
}

.close-btn {
  background-color: var(--color-four);
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
  position: relative;
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

.apartment-details h3{
    color: var(--color-four);
  }

.apartment-details {
  margin-bottom: 50px;
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
