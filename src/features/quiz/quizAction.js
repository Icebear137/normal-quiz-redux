import { persistor } from '../../app/store';

export const resetPersistedStateAction = () => (dispatch) => {
  persistor.pause();
  persistor.flush().then(() => {
    dispatch({ type: 'RESET_PERSISTED_STATE' });
    return persistor.purge();
  });
};
