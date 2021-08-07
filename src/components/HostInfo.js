import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import { Log } from '../services/Log'

class HostInfo extends Component {
  state = {
    options: this.props.areas.map(area => {return {key: area.name, text: area.name, value: area.name}}),
    value: this.props.host.area
  }

  componentDidUpdate() {
    if(this.props.host.area !== this.state.value) {
      this.setState({
        value: this.props.host.area
      })
    }
  }

  handleChangeDropDown = (e, {value}) => {
    if(this.props.checkHostInArea(value, this.props.host.id)){
      let msg = `Too many hosts. Cannot add ${this.props.host.firstName} to ${value}`
      let newLog = Log.error(msg)
      this.props.createNewLog(newLog)
    }else{
      this.setState({
        value: value
      })
      let newLog = Log.notify(`${this.props.host.firstName} set in area ${value}`)
      this.props.createNewLog(newLog)
    }
  }

  activateDisactivateHost = () => {
    let newLog = (this.props.host.active ?
      Log.notify(`Decommissioned ${this.props.host.firstName}`)
      :
      Log.warn(`Activated ${this.props.host.firstName}`))
    this.props.createNewLog(newLog)
    this.props.activeDisactiveChar(this.props.host.id)
  }

  render(){
    const p = this.props
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={p.host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {p.host.firstName} | {p.host.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.activateDisactivateHost}
                  label={p.host.active ? "Active" : 'Decommissioned'}
                  checked={p.host.active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChangeDropDown}
                value={this.state.value}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
