import { useState, useEffect, useRef } from 'react';
import '../App.css';
import ListContainer from '../components/ListContainer';

function Dashboard() {

  const [sortOrder,setSortOrder]=useState(null);
  const [filterOrder,setFilterOrder]=useState(null);
  const [lightDarkButton,setLightDarkButton]=useState("light");
  const [newIncident,setNewIncident]=useState(null);
  const [addedIncident,setAddedIncident]=useState(false);

  function lightDarkButtonHandler(){
    if(lightDarkButton==="light"){
      setLightDarkButton("dark");
    }
    
    else if(lightDarkButton==="dark"){
      setLightDarkButton("light");
    }
  }

  function sortChangeHandler(e){
     setSortOrder(e.target.value);
  }

  function filterChangeHandler(e){
    setFilterOrder(e.target.value);
  }

 

 useEffect(() => {
  if (lightDarkButton === 'light') {
    document.body.style.backgroundColor = 'white';
  }
  else if (lightDarkButton === 'dark') {
    document.body.style.backgroundColor = 'grey';
  }
}, [lightDarkButton]);

  return (
    <div className={lightDarkButton==="light"?"Applight":"Appdark"}>

   

    <h1>User Feedback Dashboard</h1>
    <div className="utilitiescontainer">
      <div className="sortcontainer">
        <h3>Sort by: </h3>
     <select className={`sortingselect utilitybuttons${lightDarkButton}`} onChange={sortChangeHandler}>
        <option>Default</option>
        <option value="Newestfirst">Newest first</option>
        <option value="Oldestfirst">Oldest first</option>
      </select>
      </div>
      <div className="filtercontainer">
        <h3>Filter: </h3>
      <select className={`filterselect utilitybuttons${lightDarkButton}`} onChange={filterChangeHandler}>
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      </div>
      <button className={`lightdarktogglebutton${lightDarkButton}`} onClick={lightDarkButtonHandler}>{lightDarkButton}</button>
    </div>
    <ListContainer sortOrder={sortOrder} filterOrder={filterOrder} lightDarkButton={lightDarkButton}/>
    </div>
  );
}

export default Dashboard;

