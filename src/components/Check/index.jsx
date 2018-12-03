import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

//Assets
import Checked from '../../Checked.svg';
import Unchecked from '../../Unchecked.svg';

const Check = ({checked, className})  => (
  <Fragment>
    { checked &&
      <img src={Checked} className={className} alt="Checked" />
    }
    { !checked &&
      <img src={Unchecked}  className={className}  alt="Unchecked" />
    }
  </Fragment>
);

Check.defaultProps = {
  checked: false,
};

Check.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Check;
