import { FaDroplet, FaDropletSlash } from "react-icons/fa6";

const PrecipitationDisplay = ({ totalPrecipitation }) => {
    return (
        <p>
            {totalPrecipitation === 0
                ? <FaDropletSlash className="icon" />
                : (<><FaDroplet className="icon" /> {totalPrecipitation} mm</>)}
        </p>
    );
};

export default PrecipitationDisplay;
