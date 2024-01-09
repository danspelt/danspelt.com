import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [avaTarUrl, setAvaTarUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isEcom, setIsEcom] = useState(false);
  const [isFintech, setIsFintech] = useState(false);
  const [isActived, setIsActived] = useState(false);

  const [token, setToken] = useState("");
  return (
    <UserContext.Provider value={{
      username, setUsername,
      firstName, setFirstName,
      lastName, setLastName,
      avaTarUrl, setAvaTarUrl,
      emailAddress, setEmailAddress,
      isAdmin, setIsAdmin,
      isBusiness, setIsBusiness,
      isEcom, setIsEcom,
      isFintech, setIsFintech,
      isActived, setIsActived,
      token, setToken
       }}>
      {children}
    </UserContext.Provider>
  );
};
