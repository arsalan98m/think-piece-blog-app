import {
  Container,
  Alert,
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
  Col,
} from "rsuite";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, createUserProfileDocument } from "../firebase";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory("");

  const handleSubmit = async () => {
    if (displayName && email && password) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        createUserProfileDocument(user, { displayName });

        Alert.success("Successfully Signed Up");
        history.push("/");
      } catch (error) {
        Alert.error(error.message, 3000);
      }
    } else {
      Alert.error("Plzz Fill All Fields", 3000);
    }
  };

  return (
    <Container>
      <Link to="/" className="header__text">
        Think Piece Blog
      </Link>{" "}
      <Content className="signUp">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item
            componentClass={Col}
            colspan={18}
            md={12}
            className="signIn__signUp"
          >
            <Panel header={<h3>Sign Up</h3>} bordered>
              <Form fluid onSubmit={handleSubmit}>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    value={displayName}
                    onChange={(e) => setDisplayName(e)}
                    name="name"
                  />
                </FormGroup>
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
                  <ButtonToolbar>
                    <Button appearance="primary" type="submit" block>
                      Sign Up
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>

              <div style={{ marginTop: "1rem" }}>
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default SignUp;
