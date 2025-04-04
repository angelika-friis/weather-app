import styles from './TemperatureDisplay.module.css'

const TemperatureDisplay = ({ temps }) => {
    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));

    return (
        <p className={styles.temp}>
            {minTemp}°C / {maxTemp}°C
        </p>
    );
};

export default TemperatureDisplay;
