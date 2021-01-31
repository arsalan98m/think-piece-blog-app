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
  Alert,
  Col,
} from "rsuite";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserProvider } from "../context/UserProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useUserProvider();

  const handleSubmit = async () => {
    if (email) {
      try {
        await resetPassword(email);

        Alert.success("Plzz Check your Inbox for further instructions", 2000);

        setEmail("");
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
            <Panel header={<h3>Forgot Passoword</h3>} bordered>
              <Form fluid onSubmit={handleSubmit}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    value={email}
                    onChange={(e) => setEmail(e)}
                    name="name"
                    t
                  />
                </FormGroup>

                <FormGroup>
                  <ButtonToolbar>
                    <Button type="submit" appearance="primary" block>
                      Reset Password
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <Link to="/login">Log in</Link>
              </div>

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
