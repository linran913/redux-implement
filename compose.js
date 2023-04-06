module.exports = function compose(...funcs){
    if(funcs.length === 0){//由于调用时compose(...middlewareChain)(store.dispatch)，相当于把传入的dispatch返回了
        return (args) => args;
    }
    if(funcs.length === 1){
        return funcs[0];
    }
    //嵌套调用，把传入的函数[a,b,c,d]返回为a(b(c(d(...args))))
    return funcs.reduce((prev, curr) => (...args) => prev(curr(...args)));
}