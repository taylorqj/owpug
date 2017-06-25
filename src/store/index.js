import productionStore from './configureStore.prod';
import devStore from './configureStore.dev';

const store = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')
  ? productionStore
  : devStore;

export default store;
