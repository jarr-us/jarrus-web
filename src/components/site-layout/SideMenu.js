import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import SideMenuItem from './side-menu-item';

export const SideMenu = ({ location }) => (
  <div className="side-menu">
    <MenuList>
      <Link to="/" selected={location.pathname === '/'}>
        <SideMenuItem icon="table_chart" primaryText="Solutions" />
      </Link>
      <a
        href="https://blog.jarr.us"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SideMenuItem icon="link" primaryText="Project Jarrus Blog" />
      </a>
    </MenuList>
  </div>
);

SideMenu.propTypes = {
  location: PropTypes.object,
};

SideMenu.defaultProps = {
  location: { pathname: '' },
};

export default SideMenu;
