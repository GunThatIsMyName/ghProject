import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
import Doughnut2d from "./Charts/Doughnut2d";

const Repos = () => {
  const { repos } = useContext(GithubContext);
  let language = repos.reduce((total,curr)=>{
    const {language,stargazers_count}=curr;
    if(!language)return total;
    if(!total[language]){
      total[language] = {label:language,value:1,stars:stargazers_count}
    }else{
      total[language]={...total[language],value:total[language].value+1,stars:total[language].stars + stargazers_count}
    }
    return total;
  },{})

  const mostUsed = Object.values(language).sort((a,b)=>b.value-a.value).splice(0,5);
  const mostPopular = Object.values(language).sort((a,b)=>b.stars-a.stars).map((item)=>{
    return {...item,value:item.stars}
  }).slice(0,5);

  let {stars}=repos.reduce((total,item)=>{
    const {stargazers_count,name,forks}=item;
    total.stars[name] = {label:name,value:0,forks,star:stargazers_count}
    return total
  },{
    stars:{}
  })
  const mostStars = Object.values(stars).sort((a,b)=>b.star-a.star).map((item)=>{
    return {...item,value:item.star}
  }).slice(0,5);
  const mostFork = Object.values(stars).sort((a,b)=>b.forks-a.forks).map((item)=>{
    return {...item,value:item.forks}
  }).slice(0,5)
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={mostStars} />
        <Doughnut2d data={mostPopular} />
        <Bar3D data={mostFork} />
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
