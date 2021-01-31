import CurrentUser from "./CurrentUser";
import { useUserProvider } from "../context/UserProvider";
const Authentication = () => {
  const { user } = useUserProvider();

  return <div className="section">{user && <CurrentUser {...user} />}</div>;
};

export default Authentication;
