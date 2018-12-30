import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const SiteMenuItem = ({ icon, primaryText, selected }) => (
  <MenuItem selected={selected}>
    <ListItemIcon>
      <i className="material-icons">{icon}</i>
    </ListItemIcon>
    <ListItemText
      primary={<Typography variant="h6" className={selected ? 'selected' : ''}>{primaryText}</Typography>}
    />
  </MenuItem>
);

SiteMenuItem.propTypes = {
  icon: PropTypes.string,
  primaryText: PropTypes.string,
  selected: PropTypes.bool,
};

SiteMenuItem.defaultProps = {
  icon: 'link',
  primaryText: 'MenuItem',
  selected: false,
};

export default SiteMenuItem;
