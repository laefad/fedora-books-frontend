
export const generateHSLColors = (
    saturation: number, 
    lightness: number, 
    amount: number,
    alpha = 1.0 as number
) => {
    let colors = [];
    const huedelta = Math.trunc(360 / amount);

    for (let i = 0; i < amount; i++) {
        let hue = i * huedelta;
        colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`);
    }

    return colors;
}
