module.exports =function createStore(reducer, enhancer) {
    if(enhancer){
        return enhancer(createStore)(reducer);
    }

    let state = null;
    let listeners = [];
    
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
        return action;
    }
    function getState() {
        return state;        
    }
    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    dispatch({
        type: 'INIT',
    });

    return {
        dispatch,
        getState,
        subscribe
    }
}


