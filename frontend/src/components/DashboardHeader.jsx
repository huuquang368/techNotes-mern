import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashboardHeader() {
  const { isAdmin, isManager } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isError, isLoading, isSuccess, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");
  const onLogout = () => sendLogout();

  if (isLoading) return <p>Logging out ...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  const hasDashClass =
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
      ? "dash-header__container--small"
      : "";
  const errClass = isError ? "errmsg" : "offscreen";
  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${hasDashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {NOTES_REGEX.test(pathname) && (
              <button className="icon-button" onClick={onNewNoteClicked}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
              </button>
            )}
            {USERS_REGEX.test(pathname) && (
              <button className="icon-button" onClick={onNewUserClicked}>
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            )}
            {!NOTES_REGEX.test(pathname) && pathname.includes("/dash") && (
              <button className="icon-button" onClick={onNotesClicked}>
                <FontAwesomeIcon icon={faFilePen} />
              </button>
            )}
            {(isManager || isAdmin) &&
              !USERS_REGEX.test(pathname) &&
              pathname.includes("/dash") && (
                <button className="icon-button" onClick={onUsersClicked}>
                  <FontAwesomeIcon icon={faUserGear} />
                </button>
              )}
            <button className="icon-button" onClick={onLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
