import { useState, useEffect } from "react";
import axios from "axios";

const useTitanicData = () => {
  const [data, setData] = useState({});
  const ageGroups = [
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/titanic/survival")
      .then((response) => {
        setData(response.data);
        // console.log("Fetched Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return { data, ageGroups };
};

export default useTitanicData;
