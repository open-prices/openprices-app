module.exports = function memoize(func, options = {}) {
    var memo = {};
    var slice = Array.prototype.slice;

    return function () {
        var args = slice.call(arguments)
        var str = JSON.stringify(args)

        if (str in memo) {
            return memo[str];
        }
        else {
            var p = func.apply(this, args)
            memo[str] = p

            if (isPromise(p)) {
                p.catch(function (err) {
                    delete memo[str]
                    throw err
                })
            }
            if (options.expires) {
                setTimeout(function(){
                    delete memo[str]
                }, options.expires)
            }
            return p
        }
    }
}

function isPromise(p) {
    var hasThen = typeof p.then === 'function'
    var hasCatch = typeof p.catch === 'function'
    return hasThen && hasCatch
}