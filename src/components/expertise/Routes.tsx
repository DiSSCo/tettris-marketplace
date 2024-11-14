/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Expertise from "./Expertise";
import ExpertProfile from "./ExpertProfile";


/* Routes associated with the Expertise page */
const routes = [
    <>
        <Route key="expertise" path="/expertise" element={<Expertise />} />
        <Route path="/expertise/:name" element={<ExpertProfile />} />
    </>
];

export default routes;