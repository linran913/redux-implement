const compose =  require('./compose');

module.exports = function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => store.dispatch(action, ...args),
        }

        const middlewareChain = middlewares.map( middleware => middleware(middlewareAPI));

        const dispatch = compose(...middlewareChain)(store.dispatch);

        return {
            ...store,
            dispatch, 
        }
    }
}