import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

//Assets
import Checked from '../../Checked.svg';
import Unchecked from '../../Unchecked.svg';

const Check = ({status, className})  => (
  <Fragment>
    { status !== 'active' &&
      <img src={Checked} className={className} alt="Checked" />
    }
    { status === 'active' &&
      <img src={Unchecked}  className={className}  alt="Unchecked" />
    }
  </Fragment>
);

Check.defaultProps = {
  checked: false,
};

Check.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Check;
