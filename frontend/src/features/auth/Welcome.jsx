import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <Link to="/dash/notes">View techNotes</Link>
      <Link to="/dash/notes/new">Add New techNotes</Link>
      <Link to="/dash/users">View User Settings</Link>
      <Link to="/dash/users/new">Add New User</Link>
    </section>
  );
};
export default Welcome;
