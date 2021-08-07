import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'



const Details = ({ host, activeDisactiveChar, handleDropDownChange, areas, createNewLog, checkHostInArea }) => {

  const renderImg = () => (<Image size='medium' src={Images.westworldLogo}/>)

  return(
    <Segment id="details" className="HQComps">
      {host ?
        <HostInfo 
        host={host} 
        activeDisactiveChar={activeDisactiveChar} 
        handleDropDownChange={handleDropDownChange} 
        areas={areas} 
        createNewLog={createNewLog}
        checkHostInArea={checkHostInArea}
        /> 
        : 
        renderImg()}
    </Segment>
  )
}

export default Details
