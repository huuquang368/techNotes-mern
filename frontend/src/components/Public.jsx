import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Technotes App!</span>
        </h1>
      </header>
      <main className="public__main">
        <address className="public__addr">
          Nika
          <br />
          HCM
          <br />
          VietNam
          <br />
        </address>
        <br />
        <p>techNote app</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};
export default Public;
