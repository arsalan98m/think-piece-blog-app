import Posts from "./Posts";
import { Container } from "rsuite";
import Authentication from "./Authentication";
import { Loader } from "rsuite";
import { useUserProvider } from "../context/UserProvider";

const Dashboard = () => {
  const { loading } = useUserProvider();

  if (loading) {
    return <Loader size="lg" center />;
  }

  return (
    <Container>
      <h1
        className="header__text"
        style={{ textAlign: "center", color: "#222" }}
      >
        Think piece Blog
      </h1>
      <Authentication />
      <Posts />
    </Container>
  );
};

export default Dashboard;
