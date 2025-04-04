import { getCompassDirection } from "../../utils/getCompassDirection";
import { GoArrowUp, GoArrowDown, GoArrowLeft, GoArrowRight, GoArrowUpRight, GoArrowUpLeft, GoArrowDownRight, GoArrowDownLeft } from "react-icons/go";

const Wind = ({ws, gust, wd}) => {
    const getWindIcon = (degrees) => {
        if (degrees >= 337.5 || degrees < 22.5) return <GoArrowDown className="icon wind-icon"/>; // N
        if (degrees >= 22.5 && degrees < 67.5) return <GoArrowDownRight className="icon wind-icon"/>; // NE
        if (degrees >= 67.5 && degrees < 112.5) return <GoArrowRight className="icon wind-icon"/>; // E
        if (degrees >= 112.5 && degrees < 157.5) return <GoArrowUpRight className="icon wind-icon"/>; // SE
        if (degrees >= 157.5 && degrees < 202.5) return <GoArrowUp className="icon wind-icon"/>; // S
        if (degrees >= 202.5 && degrees < 247.5) return <GoArrowUpLeft className="icon wind-icon"/>; // SW
        if (degrees >= 247.5 && degrees < 292.5) return <GoArrowLeft className="icon wind-icon"/>; // W
        if (degrees >= 292.5 && degrees < 337.5) return <GoArrowDownLeft className="icon wind-icon"/>; // NW
        return null;
    };    
    
    return (
        <>
            <p>{getWindIcon(wd)}{` ${getCompassDirection(wd)} `}{`${ws} (${gust}) m/s`}</p>
        </>
    )
}

export default Wind;