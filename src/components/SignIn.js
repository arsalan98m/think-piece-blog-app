import {
  Container,
  Content,
  FlexboxGrid,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Icon,
  Alert,
  Col,
} from "rsuite";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { signInWithGoogle, auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);

        Alert.success("Successfully Signed In", 2000);
        history.push("/");
      } catch (error) {
        Alert.error(error.message, 3000);
      }
    } else {
      Alert.error("Fields are empty", 3000);
    }
  };
  return (
    <Container>
      <Link to="/" className="header__text">
        Think Piece Blog
      </Link>

      <Content className="signUp">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item
            componentClass={Col}
            colspan={18}
            md={12}
            className="signIn__signUp"
          >
            <Panel header={<h3>Sign In</h3>} bordered>
              <Form fluid onSubmit={handleSubmit}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    value={email}
                    onChange={(e) => setEmail(e)}
                    name="name"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e)}
                    type="password"
                  />
                </FormGroup>
                <FormGroup>
                  <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password" className="forgot__password">
                      Forgot Password?
                    </Link>
                  </div>
                  <ButtonToolbar>
                    <Button type="submit" appearance="primary" block>
                      Sign In
                    </Button>
                    <Button color="red" onClick={signInWithGoogle} block>
                      <Icon icon="google" /> Sign In with Google
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>

              <div style={{ marginTop: "1rem" }}>
                Need an account? <Link to="/signup">Sign up</Link>
              </div>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default SignIn;
