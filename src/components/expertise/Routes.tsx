/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Expertise from "./Expertise";


/* Routes associated with the Expertise page */
const routes = [
    <Route key="expertise" path="/expertise" element={<Expertise />} />
];

export default routes;