import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';

export const fetchUserInfo = async (userId) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  try {
    const response = await axios.get('http://localhost:8080/api/members/' + userId, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.data.statusCode === 200) {
      const userInfo = response.data.data;
      userStore.setUserInfo(userInfo);
    }
  } catch (e) {
    console.error(e);
  }
};

export const clearAuthData = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  authStore.setToken(null);
  userStore.setUserInfo(null);
};
