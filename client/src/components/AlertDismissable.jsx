import { useState } from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

export default function AlertDismissible({ setHasError }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        className="alert-btn-close text-center mb-2 p-1"
        variant="danger"
        onClose={() => {
          setHasError(false);
          setShow(false);
        }}
        dismissible
      >
        <Alert.Heading>Oops!</Alert.Heading>
        <p className="m-1">An error occurred. Please try again later.</p>
      </Alert>
    );
  }
  return <></>;
}

AlertDismissible.defaultProps = {
  setHasError: null,
};

AlertDismissible.propTypes = {
  setHasError: PropTypes.func,
};
