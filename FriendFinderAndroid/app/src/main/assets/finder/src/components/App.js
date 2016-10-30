import { MemoryRouter, Match } from 'react-router';
import BottomBar from './BottomBar';
import WideView from './WideView';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 2,
      user: false,
      tracking: false,
      users: []
    }
  }

  componentWillMount() {
    const users = firebase.database().ref('users')
    users.once('value', (users) => {
      for (var i in users.val()) {
        console.log(i);
        this.setState({
          users: [...this.state.users, users.val()[i]]
        })
        console.log(this.state.users);
      }
    })
  }

  setIndex = index => {
    this.setState({
      index
    })
  }

  signIn = userId => {
    this.setState({
      user: userId
    })
  }

  track = userId => {
    this.setState({
      tracking: userId
    })
  }

  render() {
    return (
      <div>
        <WideView index={this.state.index} users={this.state.users} signIn={this.signIn} track={this.track} user={this.state.user}/>
        <BottomBar index={this.state.index} setIndex={this.setIndex}/>
      </div>
    )
  }
}
