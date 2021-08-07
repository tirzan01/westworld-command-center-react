import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import ColdStorage from './ColdStorage'
import Details from './Details'
import LogPanel from './LogPanel'


class Headquarters extends Component {

  constructor() {
    super()

    this.state = {
      logs: []
    }
  }

  createNewLog = ({ type, msg, ERROR }) => {
    let updateLogs = [...this.state.logs]
    updateLogs.unshift({type: type, msg: msg, ERROR: ERROR})
    this.setState({logs: updateLogs})
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
         <ColdStorage hosts={this.props.hosts} handleClick={this.props.handleTumbNailImgClick} />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details 
            host={this.props.selectedHost} 
            activeDisactiveChar={this.props.activeDisactiveChar} 
            handleDropDownChange={this.props.handleDropDownChange} 
            areas={this.props.areas}
            createNewLog={this.createNewLog}
            checkHostInArea={this.props.checkHostInArea}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel 
            activateDismissAll={this.props.activateDismissAll} 
            hosts={this.props.hosts} 
            createNewLog={this.createNewLog} 
            logs={this.state.logs}
          /> 
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
