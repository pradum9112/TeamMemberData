import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");
export const authdata = createContext("");

const ContextProvider = ({ children }) => {
  const [udata, setUdata] = useState("");
  const [updata, setUpdata] = useState("");
  const [dltdata, setDLTdata] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <adddata.Provider value={{ udata, setUdata }}>
      <updatedata.Provider value={{ updata, setUpdata }}>
        <deldata.Provider value={{ dltdata, setDLTdata }}>
          <authdata.Provider
            value={{ loggedIn, setLoggedIn, userId, setUserId }}
          >
            {children}
          </authdata.Provider>
        </deldata.Provider>
      </updatedata.Provider>
    </adddata.Provider>
  );
};

export default ContextProvider;
