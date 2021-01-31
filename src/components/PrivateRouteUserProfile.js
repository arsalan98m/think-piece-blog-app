import { Route, Redirect } from "react-router-dom";
import { useUserProvider } from "../context/UserProvider";

const PrivateRouteUserProfile = ({ component: Component, ...rest }) => {
  const { user } = useUserProvider();
  console.log("u=>", user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRouteUserProfile;
