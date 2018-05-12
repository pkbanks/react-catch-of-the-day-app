import React from 'react';
import {formatPrice} from '../helpers'

class Order extends React.Component {

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';  // checks whether we have any fish, and the status is avail

    // return nothing if there are no fish
    if(!fish) return null;
    // check whether fish is avail before rendering line item
    if(!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available.</li> ;
    }
    return (<li key={key}>
      {count} lbs {fish.name}
      {formatPrice(count * fish.price)}
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    </li>);
  } 

  render() {

    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }

      return prevTotal;

    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul>
          {orderIds.map(this.renderOrder)}
        </ul>

        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;