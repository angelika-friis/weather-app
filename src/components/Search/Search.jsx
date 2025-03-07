import WeatherServices from "../../services/WeatherServices";

const SearchForm = ({ searchVal, setSearchVal, locationList }) => {

    return (
        <form name="search">
            <input type='text' required value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
            <button type='submit'>Sök</button>
            <p></p>
        </form>
    )
}

export default SearchForm;