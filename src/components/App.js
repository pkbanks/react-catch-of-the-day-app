import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match

    // reinstate local storage, to bring back what was there from past activity
    // state gets cleared when we mount it
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // store fishes component in firebase database
    // using the path saved in props storeId, via router
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    // console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    // prevents a memory leak when we unmount the app, by clicking 'back' button in browser, away from store
    base.removeBinding(this.ref);
  }

  
  addFish = (fish) => {
    console.log('adding a fish');
    // take a copy of the existing state
    const fishes = {...this.state.fishes};
    // add new fish to fishes
    fishes[`fish[${Date.now()}]`] = fish;

    this.setState({ fishes  });
  }

  updateFish = (key, updatedFish) => {
    // take a copy of the current state of fishes
    const fishes = { ...this.state.fishes };
    // update that state
    fishes[key] = updatedFish;
    // set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // copy state
    const fishes = { ...this.state.fishes };
    // set the fish we want to delete to null
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = {...this.state.order}
    // either add to the order, or update the quantity
    order[key] = order[key] + 1 || 1;
    // call setState to update
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // take a copy of state
    const order = {...this.state.order}
    // either remove the order, or update the quanityt
    delete order[key];
    // call setState to update
    this.setState({ order });
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
          <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
          <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} />
      </div>
    )
  }

}

export default App;