import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUpRight, FaArrowUpLeft, FaArrowDownRight, FaArrowDownLeft } from "react-icons/fa";

const Wind = ({ws, gust, wd}) => {
    const getWindIcon = (degrees) => {
        if (degrees >= 337.5 || degrees < 22.5) return <FaArrowUp />; // N
        if (degrees >= 22.5 && degrees < 67.5) return <FaArrowUpRight />; // NE
        if (degrees >= 67.5 && degrees < 112.5) return <FaArrowRight />; // E
        if (degrees >= 112.5 && degrees < 157.5) return <FaArrowDownRight />; // SE
        if (degrees >= 157.5 && degrees < 202.5) return <FaArrowDown />; // S
        if (degrees >= 202.5 && degrees < 247.5) return <FaArrowDownLeft />; // SW
        if (degrees >= 247.5 && degrees < 292.5) return <FaArrowLeft />; // W
        if (degrees >= 292.5 && degrees < 337.5) return <FaArrowUpLeft />; // NW
        return null;
    };    
    
    return (
        <>
            {getWindIcon(wd)}
            <p>{` ${ws} (${gust})`}</p>
        </>
    )
}

export default Wind;