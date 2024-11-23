<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "vue-chartjs";

// ChartJS 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
// 거래 데이터와 차트 데이터를 저장할 상태
const chartData = ref({
  labels: [], // X축 레이블
  datasets: [
    {
      label: "거래량",
      data: [],
      borderColor: "#3B82F6", // 선 색상
      backgroundColor: "rgba(59, 130, 246, 0.2)", // 배경 색상
      tension: 0.4, // 곡선의 부드러움 정도
    },
  ],
});
const chartOptions = ref({
  responsive: true, // 반응형 여부
  plugins: {
    legend: {
      display: false, // 범례 비활성화
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw.toFixed(1)}억`, // 툴팁에 표시될 값 포맷
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // X축 그리드 비활성화
      },
    },
    y: {
      ticks: {
        callback: (value) => `${value}억`, // Y축 값 포맷
      },
    },
  },
});
const props = defineProps(["apartment"]);
const emit = defineEmits(["close"]);

// deals 데이터 상태
const deals = ref([]);

// 거래 금액 포맷 함수
const formatDealAmount = (amount) => {
  const valueInWon = parseInt(amount.replace(/,/g, ""), 10); 
  return `${(valueInWon / 10000).toFixed(1)}억`; // 억 단위로 변환
};

// 평균 실거래가 및 평당가 계산
const averageDealAmount = computed(() => {
  if (!deals.value.length) return null;

  const totalAmount = deals.value.reduce((sum, deal) => {
    const amount = parseInt(deal.dealAmount.replace(/,/g, ""), 10);
    return sum + amount;
  }, 0);

  return totalAmount / deals.value.length; // 평균 금액
});

const averagePerUnitPrice = computed(() => {
  if (!deals.value.length) return null;

  const totalPricePerUnit = deals.value.reduce((sum, deal) => {
    const amount = parseInt(deal.dealAmount.replace(/,/g, ""), 10);
    const area = parseFloat(deal.dealExcluUseAr); // 전용면적
    return sum + (area ? amount / area : 0);
  }, 0);

  return totalPricePerUnit / deals.value.length; // 평균 평당가
});

// Backend API 호출
const fetchDeals = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/apt/search/deals`, {
      params: { aptSeq: props.apartment.aptSeq },
    });
    deals.value = response.data;
    chartData.value.labels = deals.value.map(
      (deal) => `${deal.dealYear}.${String(deal.dealMonth).padStart(2, "0")}` // 년.월 포맷
    );
    chartData.value.datasets[0].data = deals.value.map((deal) =>
      parseInt(deal.dealAmount.replace(/,/g, ""), 10) / 10000 // 억 단위로 변환 후 데이터 저장
    );
  } catch (error) {
    console.error("거래 데이터를 가져오는 중 오류 발생:", error);
  }
};

onMounted(() => {
  if (props.apartment && props.apartment.aptSeq) {
    fetchDeals();
  }
});
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

    <!-- 거래 평균 정보 -->
    <div class="average-deal-section" v-if="averageDealAmount && averagePerUnitPrice">
      <h3>거래정보</h3>
      <div class="average-deal-info">
        <p>
          <strong>최근 실거래가 평균</strong>: {{ (averageDealAmount / 10000).toFixed(1) }}억 원
        </p>
        <p>
          <strong>평당가</strong>: {{ Math.round(averagePerUnitPrice).toLocaleString() }}원
        </p>
      </div>
    </div>

    <!-- 거래 정보 -->
    <div class="deals-section" v-if="deals.length > 0">
      <h3>실거래가 히스토리 <span>총 {{ deals.length }}건</span></h3>
      <table>
        <thead>
          <tr>
            <th>계약일</th>
            <th>거래종류</th>
            <th>층수</th>
            <th>면적 (m²)</th>
            <th>거래금액 (억)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deal in deals" :key="deal.apartmentDealsId">
            <td>{{ `${deal.dealYear}.${String(deal.dealMonth).padStart(2, "0")}.${String(deal.dealDay).padStart(2, "0")}` }}</td>
            <td>매매</td>
            <td>{{ deal.dealFloor }}</td>
            <td>{{ deal.dealExcluUseAr }}</td>
            <td>{{ formatDealAmount(deal.dealAmount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>거래 정보가 없습니다.</p>
    </div>
    <!-- 거래 그래프 -->
    <div class="chart-container" v-if="deals.length > 0">
      <h3>거래량 그래프</h3>
      <Line :data="chartData" :options="chartOptions" />
    </div>
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
  color: black;
}

/* 거래 정보 테이블 */
.deals-section {
  margin-top: 20px;
}

.deals-section h3 {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.deals-section table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.deals-section th,
.deals-section td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.deals-section th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.deals-section td {
  color: #333;
}

.deals-section tr:hover {
  background-color: #f9f9f9;
}
.average-deal-section {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.average-deal-info {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.average-deal-info p {
  margin: 0;
}

</style>
