const createStore = require('./createStore');
const applyMiddleware = require('./applyMiddleware');
const logger = require('./logger');
const thunk = require('./thunk');

const reducer = (state, action) => {
    switch(action.type) {
        case 'inc':
            return state + 1;
        case 'dec':
            return state - 1;
        default:
            return state;
    }
}

//const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(logger));
console.log("store: ",store);
const { dispatch, subscribe, getState } = store;

subscribe(() => {
    const state = getState();
    console.log("state: ",state, "\n");

})

dispatch({
    type: 'inc'
})
dispatch({
    type: 'inc'
})
dispatch({
    type: 'inc'
})
dispatch({
    type: 'inc'
})
dispatch({
    type: 'dec'
})
dispatch({
    type: 'hhh'
})
dispatch({
    type: 'dec'
})
dispatch({
    type: 'inc'
})
dispatch({
    type: 'inc'
})
dispatch({
    type: 'dec'
})

const FETCH_HOME_DATA = 'fetch_home_data';

const initialState = {
    articles: [],
}

const homeReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOME_DATA:
            return action.payload;
        default:
            return state;
    }
}
const homeAction = () => {
    return async ( dispath) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    articles: [
                        {
                            id: 1,
                            title: 'article title 1',
                            content: 'article content 1',
                        },
                        {
                            id: 2,
                            title: 'article title 2',
                            content: 'article content 2',
                        }
                    ],
                });
            }, 2000);
        }).then( resolved => {
            console.log("homeAction data: ", resolved);
    
            dispath({
                type: FETCH_HOME_DATA,
                payload: resolved,
            });
        });
    }
}

const store2 = createStore(homeReducer, applyMiddleware(thunk,logger));
const { dispatch:dispatch2 } = store2;
const action = homeAction();
const homeData = dispatch2(action)
console.log("homeData: ",homeData);
