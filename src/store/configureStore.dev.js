import createSagaMiddleware from 'redux-saga';

import {
    applyMiddleware,
    createStore,
    compose,
} from 'redux';

import sagas from 'sagas';
import reducers from 'reducers';

export default function configureStore(initialState) {
    const middleware = [];

    const sagaMiddleware = createSagaMiddleware();

    middleware.push(sagaMiddleware);

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(middleware),
    );

    if (module.hot) {
        module.hot.accept('reducers', () => {
            store.replaceReducer(require('reducers'));
        });
    }

    sagaMiddleware.run(sagas);

    return store;
}
