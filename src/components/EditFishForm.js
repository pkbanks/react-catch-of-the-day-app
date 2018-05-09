import React from 'react'

class EditFishForm extends React.Component {

  render() {
    return (
      // <p>Edit Fish</p>
      <div className="fish-edit">
        <input type="text" name="name" />
        <input type="text" name="price" />
        <select type="text" name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" />
        <input type="text" name="image" />
      </div>
    );
  }

}

export default EditFishForm;