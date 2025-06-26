import React, {useState, useEffect} from 'react';
import '../App.css';
import listdata from '../list';

export default function ListContainer({sortOrder, filterOrder, lightDarkButton}) {
  const [list, setList] = useState(listdata);
  const [finalList,setFinalList]=useState(list);
  const [feedback, setFeedback] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null); 
  const [listClass,setListClass]=useState(null);
  const [buttonValue,setButtonValue]=useState(null);
  const [buttonClass,setButtonClass]=useState(null);
 

  useEffect(() => {
    let updatedllist=[...list];
    if (sortOrder === "Newestfirst") {
      updatedllist=([...list].sort((a, b) => new Date(b.report_date) - new Date(a.report_date)));
      
    } 
    else if (sortOrder === "Oldestfirst") {
      updatedllist=([...list].sort((a, b) => new Date(a.report_date) - new Date(b.report_date)));
     
    } 
    

    if (filterOrder === "Low") {
      updatedllist=(updatedllist.filter(issue => issue.severity === "Low"));
    } 
    else if (filterOrder === "Medium") {
      updatedllist=(updatedllist.filter(issue => issue.severity === "Medium"));
    } 
    else if (filterOrder === "High") {
      updatedllist=(updatedllist.filter(issue => issue.severity === "High"));
    }

    setFinalList(updatedllist);

  }, [sortOrder, filterOrder,list]);


  function handleClick(index, itemFeedback) {

    if (expandedItem === index) {
      setExpandedItem(null); 
    } else {
      setExpandedItem(index); 
      setFeedback(itemFeedback);
      setButtonValue("Hide");
      setButtonClass("buttonclicked");
      setListClass("listexpanded");
    }
  }


  return (
    
    <div className='listcontainer'>
      {finalList.map((item, index) => (
        <li key={index} className={`${expandedItem === index ? listClass : 'listcollapsed'}${lightDarkButton}`}>
          <div className="listtopcontainer">
            <h3>Username: {item.name}</h3>
            <h5>
              Email: {item.email}
            </h5>
            <div className="listsubcontainer">
            <h5>Report Date: {item.report_date}</h5>
            <h5>Category: {item.category}</h5>
            <button className={`${expandedItem === index ? buttonClass : 'buttonunclicked'}${lightDarkButton}`} onClick={() => handleClick(index, item.feedback)}>{expandedItem === index? buttonValue:"View"}</button>
            </div>
          </div>
          {expandedItem === index && <div className='description'><p><h4>Feedback:</h4>{feedback}</p></div>}
        </li>
      ))}
    </div>
  );
}


