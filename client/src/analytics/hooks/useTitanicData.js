import { useState, useEffect } from "react";

const useTitanicData = () => {
  const [data, setData] = useState([]);
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
    fetch("http://localhost:5000/api/titanic")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const processAgeGroups = (data) => {
    const result = {};
    ageGroups.forEach((group) => {
      result[group] = { survivors: 0, nonSurvivors: 0 };
    });

    const getAgeGroup = (age) => {
      if (age === null || age === undefined) return null;
      const index = Math.floor(age / 10);
      return ageGroups[index] || "71-80"; // Group ages 71+ into "71-80"
    };

    data.forEach((passenger) => {
      const group = getAgeGroup(passenger.Age);
      if (group) {
        if (passenger.Survived === 1) {
          result[group].survivors += 1;
        } else {
          result[group].nonSurvivors += 1;
        }
      }
    });

    return result;
  };

  return { data, processAgeGroups, ageGroups };
};

export default useTitanicData;
