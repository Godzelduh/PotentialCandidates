import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <Link to="/">search candidates</Link>
      <Link to="/SavedCandidates">saved candidates</Link>
    </div>
  )
};

export default Nav;
