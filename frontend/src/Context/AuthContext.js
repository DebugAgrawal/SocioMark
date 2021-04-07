import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const access = localStorage.getItem("access_token");
  // useEffect(() => {
  //   if (access) {
  //     axios
  //       .get("http://localhost:8000/user/current_user", {
  //         //Change to "https://sociomark-backend.herokuapp.com/user/current_user/"" once the backend is deployed
  //         headers: {
  //           Authorization: "Bearer " + access,
  //         },
  //       })
  //       .then((res) => {
  //         if (res && res.status === 200) {
  //           setUser(res.data.data);
  //         }
  //       });
  //   }
  // }, []);
  async function fetchCurrentUser() {
    let response = await axios.get("http://localhost:8000/user/current_user", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
    setUser(response.data.data);
  }
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  console.log(user);

  return (
    <AuthContext.Provider
      // value={user}
      value={{ value: [user], value2: [access] }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
