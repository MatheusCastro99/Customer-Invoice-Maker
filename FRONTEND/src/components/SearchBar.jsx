import React, {Component} from "react";

function SearchBar ({keyword, setKeyword}){
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search company"}
     onChange={(e) => setKeyword(e.target.value)} //SHIT NOT WORKING
    />
  );
}

export default SearchBar