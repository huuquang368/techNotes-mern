import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserById } from "./userApiSlice";

const User = ({ userId }) => {
  const navigate = useNavigate();
  const editUser = () => navigate(`/dash/users/${userId}`);
  const user = useSelector((state) => selectUserById(state, userId));
  if (!user) {
    return null;
  }
  const userRolesString = user.roles.toString().replaceAll(",", ", ");
  const cellStatus = user.active ? "" : "table__cell--inactive";

  return (
    <tr className="table__row user">
      <td className={`table__cell ${cellStatus}`}>{user.username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
      <td className={`table__cell ${cellStatus}`}>
        <button className="icon-button table__button" onClick={editUser}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};
export default User;
