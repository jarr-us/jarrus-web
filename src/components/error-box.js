import React from 'react';
import PropTypes from 'prop-types';

export const ERROR_BOX_CLASSNAME = 'error-div';

const errorBox = ({ text }) => (<div className={ERROR_BOX_CLASSNAME}>{text}</div>);

errorBox.propTypes = {
  text: PropTypes.string,
};

errorBox.defaultProps = {
  text: '',
};

export default errorBox;
