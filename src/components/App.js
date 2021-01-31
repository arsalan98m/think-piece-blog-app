import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import PostPage from "./PostPage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassowrd from "./ForgotPassword";
import PrivateRouteUserProfile from "./PrivateRouteUserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <PrivateRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/login" component={SignIn} />
          <PrivateRouteUserProfile
            path="/user-profile"
            component={UserProfile}
          />

          <PrivateRouteUserProfile path="/posts/:id" component={PostPage} />
          <Route exact path="/forgot-password" component={ForgotPassowrd} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
