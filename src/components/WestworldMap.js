import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = ({ hosts, handleClick, areas }) => {
    return (
      <Segment id="map" >
        {areas.map(area => <Area key={area.id} area={area} hosts={hosts.filter(host => host.area === area.name)} handleClick={handleClick} />)}
      </Segment>
    )
}

export default WestworldMap
