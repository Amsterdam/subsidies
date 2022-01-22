import { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Router } from "react-router-dom";

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />;
};

CustomRouter.propTypes = {
  history: PropTypes.shape(),
};

export default CustomRouter;
