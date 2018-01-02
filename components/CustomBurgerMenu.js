import React, {Component} from 'react';
//BURGERMENU
import { slide as Menu } from 'react-burger-menu'
//MUICSS
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import { storeKeyValue } from '../utilities/WebStorage.js'

class CustomBurgerMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var burgerMenuStyles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '55px',
        height: '45px',
        left: '3%',
        top: '4%'
      },
      bmBurgerBars: {
        background: '#428bca'
      },
      bmCrossButton: {
        height: '40px',
        width: '40px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#F2F2F2',
        padding: '2.5em 1.8em 0',
        fontSize: '1.15em',
        overflow: 'hidden'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }

    return (
      <Menu styles = {burgerMenuStyles} >
        <Input label="MapBox Key"
               floatingLabel={true}
               value={this.props.mapBoxKey}
               onChange={this.props.updateMapBoxKey}
               />
        <Input label="TriMet Key"
               floatingLabel={true}
               value={this.props.triMetKey}
               onChange={this.props.updateTriMetKey}
               />
        <Select name="rangeSelect"
                label="Range"
                value={this.props.searchRange}
                onChange={this.props.updateSearchRange}>
          <Option value="0.5" label="1/2 Mile" />
          <Option value="1" label="1 Mile" />
          <Option value="1.5" label="1 1/2 Miles" />
          <Option value="2" label="2 Miles" />
        </Select>
      </Menu>
    )
  }

}

export default CustomBurgerMenu;
