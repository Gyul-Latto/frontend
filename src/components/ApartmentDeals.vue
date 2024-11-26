<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const authStore = useAuthStore();
const props = defineProps(['apartment']);

const deals = ref([]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '거래량',
      data: [],
      borderColor: '#ffc26f',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw.toFixed(1)}억`,
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      ticks: {
        callback: (value) => `${value}억`,
      },
    },
  },
});

// 거래 금액 포맷 함수
const formatDealAmount = (amount) => {
  const valueInWon = parseInt(amount.replace(/,/g, ''), 10);
  return `${(valueInWon / 10000).toFixed(1)}억`;
};

// 평균 실거래가 및 평당가 계산
const averageDealAmount = computed(() => {
  if (!deals.value.length) return null;
  const totalAmount = deals.value.reduce((sum, deal) => sum + parseInt(deal.dealAmount.replace(/,/g, ''), 10), 0);
  return totalAmount / deals.value.length;
});

const averagePerUnitPrice = computed(() => {
  if (!deals.value.length) return null;
  const totalPricePerUnit = deals.value.reduce((sum, deal) => {
    const amount = parseInt(deal.dealAmount.replace(/,/g, ''), 10);
    const area = parseFloat(deal.dealExcluUseAr);
    return sum + (area ? (amount / area) * 3.3 : 0);
  }, 0);
  return totalPricePerUnit / deals.value.length;
});

// 거래 데이터 로드
const fetchDeals = async () => {
  try {
    if (!props.apartment || !props.apartment.aptSeq) return;
    const response = await axios.get('http://localhost:8080/api/apt/search/deals', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      params: { aptSeq: props.apartment.aptSeq },
    });
    deals.value = response.data;
    chartData.value.labels = deals.value.map(
      (deal) => `${deal.dealYear}.${String(deal.dealMonth).padStart(2, '0')}`
    );
    chartData.value.datasets[0].data = deals.value.map((deal) =>
      parseInt(deal.dealAmount.replace(/,/g, ''), 10) / 10000
    );
  } catch (error) {
    console.error('거래 데이터를 가져오는 중 오류 발생:', error);
    deals.value = []; // 오류 시 초기화
  }
};

onMounted(() => {
  if (props.apartment && props.apartment.aptSeq) {
    fetchDeals();
  }
});

watch(
  () => props.apartment.aptSeq,
  (newAptSeq) => {
    if (newAptSeq) {
      fetchDeals();
    }
  }
);

</script>

<template>
  <div>
    <!-- 거래 평균 정보 -->
    <h3 class="average-deal-title">거래정보</h3>
    <div class="average-deal-section" v-if="averageDealAmount && averagePerUnitPrice">
      <div class="average-deal-info">
        <p>
          <strong>최근 실거래가 평균</strong>: {{ (averageDealAmount / 10000).toFixed(1) }}억 원
        </p>
        <p>
          <strong>평당가</strong>: {{ Math.round(averagePerUnitPrice).toLocaleString() }}만원
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
.average-deal-section {
  padding: 20px ;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.average-deal-title{
  margin-top: 40px;
}

.average-deal-info {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.average-deal-info p {
  margin: 0;
}

.deals-section {
  margin-top: 50px;
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

.chart-container {
  margin-top: 40px;
}
</style>
