import React from 'react';
import PropTypes from 'prop-types';
import { APP_TITLE, APP_ICON_SRC } from '../../constants';

const Header = ({ toggleMenu }) => (
  <header className="header">
    <div className="content">
      <i
        onKeyPress={toggleMenu}
        role="button"
        tabIndex={0}
        onClick={toggleMenu}
        className="menuButton material-icons"
      >
        menu
      </i>
      <img
        alt={APP_TITLE}
        src={APP_ICON_SRC}
      />
      <div className="title">
        { APP_TITLE }
      </div>
    </div>
  </header>
);

Header.propTypes = {
  toggleMenu: PropTypes.func,
};

Header.defaultProps = {
  toggleMenu: () => {},
};

export default Header;
