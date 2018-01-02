import React, {Component} from 'react';

class MenuButtonContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var menuStyles = {
     position: "absolute",
     right: "2%",
     top: "2%",
     opacity: .85
    }

    return (
      <div style = {menuStyles}>
        {this.props.children}
      </div>
    )
  }

}

export default MenuButtonContainer;
