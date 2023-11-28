import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const response = await axios.get(
      `https://localhost:7081/api/user/does-user-exists/${to.params.username}`,
    );

    if (response.status !== 200) {
      return navigateTo('/');
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    return navigateTo('/');
  }
});
