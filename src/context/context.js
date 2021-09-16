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
  const [request,setRequest]=useState(0)
  const [error, setError] = useState({show:false,msg:""});
  const requestUser = async (user) => {
    console.log(user,"username")
    try {
      const {data} = await axios(`${rootUrl}/users/${user}`);
      if (data) {
        const {login,followers_url}=data;
        setGithubUser(data);
        // const {data:reposData} = await axios(`${rootUrl}/users/${login}/repos?per_page=100`);
        // setRepos(reposData)
        // const {data:followersData} = await axios(`${followers_url}?per_page=100`);
        // setFollowers(followersData)
        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)
        ]).then((minji)=>{
          const [left,right]=minji;
          const status = "fulfilled";
          if(left.status === status){
            setRepos(left.value.data);
          }
          if(right.status === status){
            setFollowers(right.value.data);
          }
        })
      }
    } catch (error) {
      errorBox(true, 'there is not any users matched that you entered');
    } finally {
      requestRate();
      setLoading(false);
    }
  };




  const requestRate = async()=>{
    try{
      const response = await axios(`${rootUrl}/rate_limit`);
      let {
        rate: {remaining},
      } = await response.data;
      setRequest(remaining);
      if(remaining===0){
        errorBox(true,"You have exceeded Api Houly rate")
      }
    }catch{
      console.log(error,"NO ERROR")
    }
  }
  const errorBox = (show=false,msg="")=>{
    setError({show,msg})
  }


  useEffect(() => {
    requestRate();
  }, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, githubFollowers,request,error,requestUser,loading }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
