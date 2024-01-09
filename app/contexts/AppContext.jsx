import axios from "axios";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs().add(2, "weeks"));
  const [currentSelectedTenant, setCurrentSelectedTenant] = useState('block')
  const [currentSelectedDomain, setCurrentSelectedDomain] = useState('toledoblade.com'); // default to 'toledoblade.com' for now, but should be '
  const [currentSelectedDevice, setCurrentSelectedDevice] = useState('All');
  const [currentSelectedData, setCurrentSelectedData] = useState(null);
  const [hasDateArg, setHasDateArg] = useState(false);
  const [currentDomainList, setCurrentDomainList] = useState([]);


  //debugging global console log
  const isDebugging = true; // set to false to turn off console logs everywhere
  const yqLog = (message) => {
    if (isDebugging) {
      console.log(message); 
    }
  }

  useEffect(() => {
    const fromDateFormatted = fromDate.format("YYYY-MM-DD");
    const toDateFormatted = toDate.format("YYYY-MM-DD");
    onDateRangeChanged(fromDateFormatted, toDateFormatted);    
  }, [fromDate, toDate]);

  //api calls
  const onDateRangeChanged = async (fromDate, toDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-recommendation-stats?fromDate=${fromDate}&toDate=${toDate}%tenant=${currentSelectedTenant}&domain=${currentSelectedDomain}&device=${currentSelectedDevice}` 
      );
      const parsedData = JSON.parse(response.data.data);
      setCurrentSelectedData(parsedData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AppContext.Provider value={{
      isUserSettingsOpen, setIsUserSettingsOpen,
      fromDate, setFromDate,
      toDate, setToDate,
      currentSelectedTenant, setCurrentSelectedTenant,
      currentSelectedDomain, setCurrentSelectedDomain,
      currentSelectedDevice, setCurrentSelectedDevice,
      currentSelectedData, setCurrentSelectedData,
      hasDateArg, setHasDateArg,
      currentDomainList, setCurrentDomainList,
      yqLog, 
       }}>
      {children}
    </AppContext.Provider>
  );
};
