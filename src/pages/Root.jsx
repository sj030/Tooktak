import { Outlet } from "react-router-dom";
import Menu from "../components/menu/Menu";
export default function Root() {
  return (
    <section className=" columns is-fullheight">
      <aside
        className="column is-3 is-narrow-mobile 
      is-fullheight section is-hidden-mobile"
      >
        <Menu />
      </aside>
      <div className="column is-9">
        <Outlet className="column is-9" />
      </div>
    </section>
  );
}
