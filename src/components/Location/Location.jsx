const Location = ({ location }) => {

    return (
        <>
            {location ? (
                <>
                    <h1>{location.name}</h1>
                    <h2>{location.municipality}</h2>
                </>
            ) : (
                <p>Laddar...</p>
            )}
        </>
    );
};

export default Location;