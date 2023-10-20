import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  if (!users.length) return <p>Not currently available</p>;
  return <NewNoteForm users={users} />;
};
export default NewNote;
