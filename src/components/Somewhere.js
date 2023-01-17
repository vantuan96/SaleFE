import React from 'react'
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const Somewhere = () => {
    return (
      <>
        <button
           data-tip
           data-for="feedback-popover"
           data-event="click"
         >
           Trigger
         </button>
         <Tooltip id="feedback-popover">
           <CustomComponent />
         </Tooltip>
      </>
    )
  }
  const Tooltip = ({ children, id }) => {
    return ( 
      <ReactTooltip
        border="true"
        textColor="black"
        backgroundColor="white"
        arrowColor="white"
        effect="solid"
        clickable={true}
        globalEventOff={"click"}
        id={id}
        place="bottom"
      >
        {children}
      </ReactTooltip>
    )
  }
  const CustomComponent = () => {
    const handleClick = e => {
      alert("Ok")
    }
    
    return (
      <div>
        <button onClick={handleClick}>click</button>
      </div>
    )
  }