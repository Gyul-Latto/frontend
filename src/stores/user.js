import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref({});

    const setUserInfo = (newUserInfo) => {
      userInfo.value = newUserInfo;
    };

    return { userInfo, setUserInfo };
  },
  {
    persist: true,
  },
);
