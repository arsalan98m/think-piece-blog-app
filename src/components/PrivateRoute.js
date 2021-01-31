import { Route, Redirect } from "react-router-dom";
import { useUserProvider } from "../context/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserProvider();
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
