import React from 'react';

class Dashboard extends React.Component {

  render() {

    let currentItem = null;

    if (this.props.currentItem < 4 && this.props.status === 'started') {

      let currentItemProp = this.props.items[this.props.currentItem];
      console.log(`currentItemProp ${JSON.stringify(currentItemProp)}`);

      currentItem = (
        <img
          className="current-item"
          src={ currentItemProp.hintUrl }
          alt={ currentItemProp.title }
        />
      );
    }

    return (
      <div className="dashboard">
        <div className="current-item-container">
          { currentItem }
        </div>
      </div>
    );
  }
};

export default Dashboard;
