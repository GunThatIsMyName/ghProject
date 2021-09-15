import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useContext(GithubContext);
  let language = repos.reduce((total,curr)=>{
    const {language}=curr;
    if(!language)return total;
    if(!total[language]){
      total[language] = {label:language,value:1}
    }else{
      total[language]={...total[language],value:total[language].value+1}
    }
    return total;
  },{})
  language = Object.values(language).sort((a,b)=>b.value-a.value).splice(0,5);
  console.log(language,"!!")
  const chartData = [
    {
      label: "html",
      value: "13",
    },
    {
      label: "css",
      value: "16",
    },
    {
      label: "js",
      value: "20",
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={language} />
        {/* <ExampleChart data={chartData} /> */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
