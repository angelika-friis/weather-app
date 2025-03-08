const Location = ({ location }) => {

    return (
        <>
            {location && location.result.region ? (
                <>
                    <h1>{location.result.sublocality}</h1>
                    <h2>{location.result.region}</h2>
                </>
            ) : (
                <p>Laddar...</p>
            )}
        </>
    );
};

export default Location;