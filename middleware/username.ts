// export default defineNuxtRouteMiddleware(async () => {
//   const user = useSupabaseUser();
//   const userId = user.value?.id;
//   const apiLink = process.env.API_URL + "user/username/" + userId;
//     try {
//       const response = await fetch(apiLink)
//       const data = await response.json()
//       const username = data.username
//       if (!username) {
//         return navigateTo('/set-username')
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error)
//       return navigateTo('/error')
//     }
//   });
