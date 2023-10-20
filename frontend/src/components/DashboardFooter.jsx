import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username, status } = useAuth();
  return (
    <footer className="dash-footer">
      {pathname !== "/dash" && (
        <button
          className="dash-footer__button icon-button"
          title="Home"
          onClick={() => navigate("/dash")}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
      )}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
};
export default DashboardFooter;
