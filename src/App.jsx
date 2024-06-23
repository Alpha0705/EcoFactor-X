import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useEffect, useState } from "react";
import initialData from "./assets/StateOfTheWorldData";
import { MonthContext } from "./Contexts/MonthData";
import { co2Context } from "./Contexts/CO2";
import UVMap from "./assets/textures/earth_1k.jpg";
// import axios from "axios"; // Commented out for design preview

function App() {
  // const [_2020co2, set2020co2] = useState(null); // Commented due to unused ESLint warning
  // const [Data, setData] = useState([]); // Commented due to unused ESLint warning
  const [country] = useState("Global");
  // const [countryCode, setCountryCode] = useState("global"); // Commented due to unused ESLint warning
  const currentUpToDate = new Date();
  currentUpToDate.setMonth(currentUpToDate.getMonth() - 1);
  const [date, setDate] = useState(currentUpToDate);
  const [month, SetMonth] = useState(currentUpToDate.getMonth() + 1);
  const [year, setYear] = useState(currentUpToDate.getFullYear());
  // const [countryIndexMap, setCountryIndexMap] = useState({}); // Commented due to unused ESLint warning

  /*
  // Fetch weather data from OpenWeather API
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: "London", // Example city query (replace with dynamic values as needed)
          appid: "YOUR_OPENWEATHER_API_KEY", // Replace with your OpenWeather API key
          units: "metric", // Specify units if needed (metric, imperial, etc.)
        },
      })
      .then((response) => {
        // Handle the response here
        console.log("Weather data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []); // Ensure this useEffect runs once on component mount

  // Fetch CO2 data using the emissions API
  useEffect(() => {
    const fetchCO2Data = async () => {
      try {
        const co2Response = await axios.get("https://api.v2.emissions-api.org/api/v2/countries.json");

        set2020co2(co2Response.data);
      } catch (error) {
        console.error("Error fetching CO2 data:", error);
      }
    };

    fetchCO2Data();
  }, []); // Ensure this useEffect runs once on component mount
  */

  useEffect(() => {
    /*
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/months/${month}/${year}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0] && data[0].countries) {
          setData(data[0].countries);

          const map = data[0].countries.reduce((acc, curr, index) => {
            acc[curr.code] = index;
            return acc;
          }, {});
          setCountryIndexMap(map);
        } else {
          setData([]);
          setCountryIndexMap({});
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
        setCountryIndexMap({});
      });
    */
  }, [month, year]);

  const countryData = initialData[country];
  // const newCountryData = Data ? Data[countryIndexMap[countryCode]] : null; // Commented due to unused ESLint warning
  // const Co2Data = _2020co2 ? _2020co2.countries[countryCode] : null; // Commented due to unused ESLint warning

  // TODO: Add a loading Spinner/Suspense to the page

  return (
    <MonthContext.Provider value={[] /* Data */}>
      <div className="md:h-screen md:overflow-hidden w-screen flex max-md:flex-col font-trebuchet">
        <LeftSideOfPage
          // newCountryData={newCountryData}
          countryData={countryData}
        />
        <co2Context.Provider value={null /* _2020co2 */}>
          <MiddleOfPage
            UVMap={UVMap}
            currentUpToDate={currentUpToDate}
            setDate={setDate}
            date={date}
            setMonth={SetMonth}
            // setCountryCode={setCountryCode}
            setYear={setYear}
            // newCountryData={newCountryData}
          />
          <RightSideOfPage
            // newCountryData={newCountryData}
            // Co2Data={Co2Data}
          />
        </co2Context.Provider>
      </div>
    </MonthContext.Provider>
  );
}

export default App;
