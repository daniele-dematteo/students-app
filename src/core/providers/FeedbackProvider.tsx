import { PropsWithChildren, useState } from 'react';

import { Snackbar } from '@lib/ui/components/Snackbar';
import { Feedback } from '@lib/ui/types/Feedback';

import { FeedbackContext } from '../contexts/FeedbackContext';

export const FeedbackProvider = ({ children }: PropsWithChildren) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const setNextFeedback = (nextFeedback: Feedback) => {
    if (isSnackbarVisible) {
      // A snackbar is already visible, so we need to hide it and then show the new one
      setIsSnackbarVisible(false);
      setTimeout(() => {
        setFeedback(nextFeedback);
        setIsSnackbarVisible(true);
      }, Snackbar.ANIMATION);
    } else {
      setFeedback(nextFeedback);
      setIsSnackbarVisible(true);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{ feedback, setFeedback: setNextFeedback }}
    >
      {children}
      {feedback && (
        <Snackbar
          {...feedback}
          visible={isSnackbarVisible}
          onDismiss={() => {
            setIsSnackbarVisible(false);
          }}
        />
      )}
    </FeedbackContext.Provider>
  );
};