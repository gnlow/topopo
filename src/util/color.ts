export const randColor = () => `hsl(
    ${Math.random() * 360}
    20%
    50%
)`

export const hashColor = (num: number) => `hsl(
    ${num * 21 % 360}
    100%
    80%
)`