import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters';

class App extends Component {

  constructor() {
    super()

    this.state = {
      hosts: [],
      selectedHost: undefined,
      areas: [],
    }
  }

  activateDismissAll = () => {
    let dismissedHosts = this.state.hosts.filter(host => !host.active)
    if(dismissedHosts.length > 0) {
      let hosts = [...this.state.hosts]
      hosts.map(host => host.active = true)
      this.setState({hosts})
    }else{
      let hosts = [...this.state.hosts]
      hosts.map(host => host.active = false)
      this.setState({hosts})
    }
  }

  handleTumbNailImgClick = id => {
    let hosts = [...this.state.hosts]
    if(this.state.selectedHost) {
      let oldCurrentIndex = hosts.findIndex(host => host.id === this.state.selectedHost.id)
      hosts[oldCurrentIndex].authorized = false
    }
    let newCurrentIndex = hosts.findIndex(host => host.id === id)
    hosts[newCurrentIndex].authorized = true
    this.setState({
      selectedHost: this.state.hosts.filter(host => host.id === id)[0]
    })
  }
  
  activeDisactiveChar = id => {
    let hosts = [...this.state.hosts]
    let currentIndex = hosts.findIndex(host => host.id === id)
    hosts[currentIndex].active = !hosts[currentIndex].active
    this.setState({hosts})
  }

  checkHostInArea = (newArea, id) => {
    let hosts = [...this.state.hosts]
    let currentIndex = hosts.findIndex(host => host.id === id)
    if(hosts[currentIndex].area === newArea) return
    let hostsInTheArea = hosts.filter(host => host.area === newArea).length
    let areaLimit = this.state.areas.filter(area => area.name === newArea)[0].limit
    if(hostsInTheArea >= areaLimit){
      return true
    }else{
      this.handleDropDownChange(id, newArea)
      return false
    }
  }

  handleDropDownChange = (id, newArea) => {
    let hosts = [...this.state.hosts]
    let currentIndex = hosts.findIndex(host => host.id === id)
    hosts[currentIndex].area = newArea
    this.setState({hosts})
}

  render(){
    return (
      <Segment id='app'>
        <WestworldMap 
          hosts={this.state.hosts.filter(h => h.active)} 
          handleClick={this.handleTumbNailImgClick} 
          areas={this.state.areas} 
        />
        <Headquarters
          checkHostInArea={this.checkHostInArea}
          hosts={this.state.hosts.filter(h => !h.active)}
          selectedHost={this.state.selectedHost}
          handleTumbNailImgClick={this.handleTumbNailImgClick}
          activeDisactiveChar={this.activeDisactiveChar}
          // handleDropDownChange={this.handleDropDownChange}
          areas={this.state.areas}
          activateDismissAll={this.activateDismissAll}
        />
      </Segment>
    )
  }

  componentDidMount() {
    fetch('http://localhost:3001/hosts')
      .then(resp => resp.json())
      .then(hosts => {
        this.setState({hosts})
      })
    fetch('http://localhost:3001/areas')
      .then(resp => resp.json())
      .then(areas => {this.setState({areas})})
  }
}

export default App;
