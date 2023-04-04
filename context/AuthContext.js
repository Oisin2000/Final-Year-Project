import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const register = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://thawing-shore-72198.herokuapp.com/register", {
        email,
        password,
      })
      .then((res) => {
        console.log("res.data:", res.data);
        console.log("User registered successfully");
      })
      .catch((e) => {
        console.log("Registration error " + e);
      });
    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://thawing-shore-72198.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("res.data:", res.data);
        console.log("res.data.token:", res.data.token);

        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userInfo.token);

        console.log(userInfo);
        console.log(userInfo.token);
      })
      .catch((e) => {
        console.log("Login error " + e);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("isLogged in error ${e}");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ register, login, logout, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
