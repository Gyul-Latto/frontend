<script>
import DailyPopularApt from '@/components/popular/DailyPopularApt.vue';
import HourlyPopularApt from '@/components/popular/HourlyPopularApt.vue';
import { ref } from 'vue';

export default {
  components: {
    DailyPopularApt,
    HourlyPopularApt,
  },
  setup() {
    const selectedView = ref('hourly');

    const selectDaily = () => {
      selectedView.value = 'daily';
    };

    const selectHourly = () => {
      selectedView.value = 'hourly';
    };

    return {
      selectedView,
      selectDaily,
      selectHourly,
    };
  },
};
</script>

<template>
  <div>
    <div class="pop-box">
      <div class="pop-header">
        <h1>인기아파트</h1>
        <div class="pop-btn-box">
          <button class="pop-btn" @click="selectHourly">실시간</button>
          <button class="pop-btn" @click="selectDaily">일간</button>
        </div>
      </div>
      <div class="pop-body">
        <div v-if="selectedView === 'daily'">
          <DailyPopularApt />
        </div>
        <div v-else>
          <HourlyPopularApt />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pop-box {
  margin: 20px;
  padding: 10px;
}
.pop-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.pop-body {
  margin: 30px;
}
.pop-btn {
  width: 130px;
  height: 40px;
  color: var(--color-four);
  background-color: var(--color-one);
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
}
</style>
