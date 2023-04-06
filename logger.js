module.exports = function logger({dispatch,getState}){
    return (next) => (action) => {
        const preState = getState();
        console.log("---start logging---");
        console.log("prevState",preState);
        const result = next(action);
        const nextState = getState();
        console.log("nextState: ",nextState);
        console.log("---end logging---");
        return result;
    }
}