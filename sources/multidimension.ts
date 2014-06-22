class Multidimension {
    static forEach(size: number[], callbackfn: (coordinate: number[]) => any) {
        var stack: any[] = [size];

        var indices: number[] = [];
        var currentIndex = 0;

        var dimension = size.length; // always 2 here
        while (stack.length > 0) {
            if (currentIndex < size[indices.length]) {
                if (stack.length == dimension) {
                    callbackfn(indices.concat(currentIndex));
                    currentIndex++;
                }
                else {
                    stack.unshift(stack[0][currentIndex]);
                    indices.push(currentIndex);
                    currentIndex = 0;
                }
            }
            else {
                stack.shift();
                currentIndex = indices.pop() + 1;
            }
        }
    }
} 