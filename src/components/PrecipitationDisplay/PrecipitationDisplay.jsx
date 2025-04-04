import { TbDroplet, TbDropletOff } from "react-icons/tb";

const PrecipitationDisplay = ({ precipitation }) => {
    return (
        <p>
            {precipitation === "0.0" || precipitation === 0
                ? <TbDropletOff className="icon" />
                : (<><TbDroplet className="icon" /> {precipitation} mm</>)}
        </p>
    );
};

export default PrecipitationDisplay;