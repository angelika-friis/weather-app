export const getCompassDirection = (angle) => {
    const directions = ["North", "North-West", "West", "South-West", "South", "South-East", "East", "North-East"];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
}