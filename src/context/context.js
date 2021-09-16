import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [githubFollowers, setFollowers] = useState(mockFollowers);
  const [loading, setLoading] = useState(false);
  const [request,setRequest]=useState({})
  const [error, setError] = useState({show:false,msg:""});
  
  const requestRate = async()=>{
    try{
      let {data:{rate:{remaining,limit}}} = await axios(`${rootUrl}/rate_limit`);
      console.log(remaining,limit,"?");
      remaining=0
      setRequest({remaining,limit})
      if(remaining===0){
        errorBox(true,"hohohohohohohohohoh MOLY")
      }
    }catch{
      console.log(error)
      errorBox(true,"You have exceeded Api Houly rate")
    }
  }
  const errorBox = (show,msg)=>{
    setError({show,msg})
  }
  useEffect(() => {
    requestRate();
  }, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, githubFollowers,request,error }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
