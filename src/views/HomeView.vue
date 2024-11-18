<script setup>
import MainSearchBar from "@/components/MainSearchBar.vue";
import Banner from "@/components/Banner.vue";
import RecommendApartment from "@/components/RecommendApartments.vue"; 
import AIRecommendApartment from "@/components/AIRecommendApartment.vue"; 
import PopularApartment from "@/components/PopularApartment.vue";

</script>

<template>
  <div class="main-container">
    <MainSearchBar />
    <Banner />
    <RecommendApartment />
    <AIRecommendApartment />
    <PopularApartment />
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.main-container > * {
  margin-bottom: 5rem;
}
</style>
