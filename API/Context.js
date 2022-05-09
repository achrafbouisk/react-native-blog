import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [newsDetails, setNewsDetails] = useState([]);
  const [category, setCategory] = useState("general");
  const [index, setIndex] = useState(1);
  const [darkTheme, setDarkTheme] = useState(true);

  const fetchNews = async () => {
    const { data } = await axios.get(`${BASE_URL}/post`);
    setNews(data);
    setIndex(1);
  };

  const fetchNewsDetails = async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/post/${id}`);
      setNews(data);
      setIndex(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    fetchNewsDetails();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        news,
        newsDetails,
        setCategory,
        index,
        setIndex,
        darkTheme,
        setDarkTheme,
        fetchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
