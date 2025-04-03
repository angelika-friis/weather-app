import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const WeatherToggleButton = ({ isListVisible, onToggle }) => {
    return (
        <button onClick={onToggle}>
            {isListVisible ? <FaAngleUp className="icon" /> : <FaAngleDown className="icon" />}
        </button>
    );
};

export default WeatherToggleButton;