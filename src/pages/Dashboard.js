import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";

const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  return (
    <main>
      <Navbar />
      <Search />
      {loading ? (
        <img src={loadingImage} alt="loadinImage" />
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
