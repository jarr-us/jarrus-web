import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HeaderC from '../components/site-layout/Header';
import SideMenuC from '../components/site-layout/SideMenu';
import PageMain from './main/main-container';
import PageSession from './session/session-container';

class WebContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: true,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }));
  }

  render() {
    const { menuOpen } = this.state;
    const { location } = this.props;

    return (
      <div className={`web-container ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
        <HeaderC location={location} toggleMenu={this.toggleMenu} />
        <SideMenuC location={location} />
        <Switch>
          <Route path="/session" component={PageSession} />
          <Route path="/" component={PageMain} />
        </Switch>
      </div>
    );
  }
}

WebContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default WebContainer;
