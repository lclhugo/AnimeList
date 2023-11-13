export default function useFeedback() {
  const feedbackMessage = ref('');
  const feedbackSuccess = ref(false);

  const setFeedback = (message: string, success: boolean) => {
    feedbackMessage.value = message;
    feedbackSuccess.value = success;
  };

  const clearFeedback = () => {
    feedbackMessage.value = '';
    feedbackSuccess.value = false;
  };

  watch(feedbackMessage, () => {
    if (feedbackMessage.value !== '') {
      setTimeout(clearFeedback, 3000);
    }
  });

  return {
    feedbackMessage: feedbackMessage,
    feedbackSuccess: feedbackSuccess,
    setFeedback: setFeedback,
    clearFeedback: clearFeedback,
  };
}
