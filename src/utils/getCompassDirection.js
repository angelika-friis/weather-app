export const getCompassDirection = (angle) => {
    const directions = ["N", "NV", "V", "SV", "S", "SÖ", "Ö", "NÖ"];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
}