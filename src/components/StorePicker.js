import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  goToStore = (event) => {
    // Stop form from submitting
    event.preventDefault();

    // Get text from input
    console.log(this);

    // Change page to /store/:id
    console.log("Going to store");
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* this is a comment */ }
        <h2>Please Enter a Store</h2>

        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store -></button>
      </form>
  )}

}

export default StorePicker;