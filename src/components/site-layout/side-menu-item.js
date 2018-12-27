import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const SiteMenuItem = ({ icon, primaryText }) => (
  <MenuItem>
    <ListItemIcon>
      <i className="material-icons">{icon}</i>
    </ListItemIcon>
    <ListItemText
      primary={<Typography variant="h6">{primaryText}</Typography>}
    />
  </MenuItem>
);

SiteMenuItem.propTypes = {
  icon: PropTypes.string,
  primaryText: PropTypes.string,
};

SiteMenuItem.defaultProps = {
  icon: 'link',
  primaryText: 'MenuItem',
};

export default SiteMenuItem;
