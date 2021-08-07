import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = ({ host, handleClick }) => {
  return(
    <Card
      className={host.authorized ? "host selected" : 'host'}
      // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
      onClick={() => handleClick(host.id)}
      image={host.imageUrl}
      raised
    />
  )
}

export default Host
