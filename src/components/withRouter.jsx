import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import {
  useLocation,
  useNavigate,
  matchRoutes
} from 'react-router-dom';
import { Modal } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withRouter = (WrappedComponent, routes) => {
  const NewComponent = props => {
    const location = useLocation();
    const navigateTo = useNavigate();
    const matchs = matchRoutes(routes, location);
    const { route, ...match } = matchs[matchs.length - 1];
    const [params, setParams] = useState([]);
    const ref = useRef(false);

    useEffect(() => {
      Modal.destroyAll();
    }, [location.pathname]);

    useEffect(() => {
      ref.current = true;
    }, []);

    useEffect(() => {
      if (params?.length) {
        navigateTo(...params);
      }
      // eslint-disable-next-line
    }, [params]);

    const navigate = useCallback((...arg) => {
      if (ref.current) {
        navigateTo(...arg)
      } else {
        setParams(arg)
      }
      // eslint-disable-next-line
    }, []);

    return (
      <WrappedComponent
        {...props}
        location={location}
        navigate={navigate}
        route={route}
        match={match}
      />
    );
  };
  hoistNonReactStatic(NewComponent, WrappedComponent);
  return NewComponent;
};
export default withRouter;
