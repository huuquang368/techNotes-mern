import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashboardHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isError, isLoading, isSuccess, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  const onLogout = () => sendLogout();
  if (isLoading) return <p>Logging out ...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  const hasDashClass =
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
      ? "dash-header__container--small"
      : "";

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${hasDashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          <button className="icon-button" title="Logout" onClick={onLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
