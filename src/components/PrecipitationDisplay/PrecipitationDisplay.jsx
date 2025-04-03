import { FaDroplet, FaDropletSlash } from "react-icons/fa6";

const PrecipitationDisplay = ({ precipitation }) => {
    return (
        <p>
            {precipitation === "0.0" || precipitation === 0
                ? <FaDropletSlash className="icon" />
                : (<><FaDroplet className="icon" /> {precipitation} mm</>)}
        </p>
    );
};

export default PrecipitationDisplay;