import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList';

const ColdStorage = ({ hosts, handleClick }) => (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment.Group compact horizontal>
     <HostList hosts={hosts} handleClick={handleClick} />
    </Segment.Group>
  </Segment.Group>
)

export default ColdStorage
