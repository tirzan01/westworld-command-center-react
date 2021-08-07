import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = ({ activateDismissAll, hosts, createNewLog, logs }) => {

  const activateDisactivateAllHosts = () => {
    let newLog = (dismissedHosts.length > 0 ?
      Log.warn('Activating all hosts!')
      :
      Log.notify('Decommissiong all hosts.'))
      createNewLog(newLog)
      activateDismissAll()
  }

  let dismissedHosts = hosts.filter(host => !host.active)

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>
      
      <Button
        fluid
        color={dismissedHosts.length > 0 ? "red" : 'green'}
        content={dismissedHosts.length > 0 ? "ACTIVATE ALL" : 'DECOMMISSION ALL'}
        onClick={activateDisactivateAllHosts}
      />
    </Segment>
  )
}

export default LogPanel
