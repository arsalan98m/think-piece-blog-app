import { useState } from "react";
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
  Col,
  Alert,
} from "rsuite";

import { Link } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";
const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(true);

  const getUid = () => auth.currentUser.uid;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageInput(e.target.files[0]);
      setActiveButton(false);
    }
  };

  const handleInput = (e) => {
    setDisplayName(e);
    if (!displayName) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  const handleSubmit = () => {
    console.log(imageInput.name);
    if (displayName) {
      setIsLoading(true);
      console.log(isLoading);
      firestore
        .doc(`users/${getUid()}`)
        .update({ displayName })
        .then(() => {
          setIsLoading(false);
          setActiveButton(true);
        });
      Alert.success("Display Name Updated", 3000);
      setDisplayName("");
    }

    if (imageInput) {
      setIsLoading(true);
      storage
        .ref()
        .child("user-profiles")
        .child(getUid())
        .child(imageInput.name)
        .put(imageInput)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) =>
          firestore.doc(`users/${getUid()}`).update({ photoURL })
        )
        .then(() => {
          Alert.success("Image Updated");
          setImageInput(null);
          setIsLoading(false);
          setActiveButton(true);
        });
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
            <Panel header={<h3>Update Profile</h3>} bordered>
              <Form fluid onSubmit={handleSubmit}>
                <FormGroup>
                  <ControlLabel>Display Name</ControlLabel>
                  <FormControl
                    name="name"
                    value={displayName}
                    onChange={handleInput}
                  />
                </FormGroup>

                <p style={{ marginBottom: "0.75rem" }}>Uploda Image</p>
                <input
                  type="file"
                  style={{ marginBottom: "1rem" }}
                  onChange={handleChange}
                ></input>

                <FormGroup>
                  <ButtonToolbar>
                    <Button
                      appearance="primary"
                      loading={isLoading ? true : false}
                      type="submit"
                      block
                      disabled={activeButton}
                    >
                      Update
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
                <Link to="/">Back to Home</Link>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default UserProfile;
