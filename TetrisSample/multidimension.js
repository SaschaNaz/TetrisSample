var Multidimension = (function () {
    function Multidimension() {
    }
    Multidimension.forEach = function (size, callbackfn) {
        var stack = [size];

        var indices = [];
        var currentIndex = 0;

        var dimension = size.length;
        while (stack.length > 0) {
            if (currentIndex < size[indices.length]) {
                if (stack.length == dimension) {
                    callbackfn(indices.concat(currentIndex));
                    currentIndex++;
                } else {
                    stack.unshift(stack[0][currentIndex]);
                    indices.push(currentIndex);
                    currentIndex = 0;
                }
            } else {
                stack.shift();
                currentIndex = indices.pop() + 1;
            }
        }
    };
    return Multidimension;
})();
//# sourceMappingURL=multidimension.js.map
