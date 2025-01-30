/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Expertise from "./Expertise";
import Expertise2 from "./Expertise2";
import ExpertProfile from "./ExpertProfile";
import ExpertProfile2 from "./ExpertProfile2";
import ExpertProfile3 from "./ExpertProfile3";


/* Routes associated with the Expertise page */
const routes = [
    <>
        <Route key="expertise" path="/expertise" element={<Expertise />} />
        <Route key="expertise2" path="/expertise2" element={<Expertise2 />} />
        <Route path="/expertise/:name" element={<ExpertProfile />} />
        <Route path="/expertise2/:name" element={<ExpertProfile2 />} />
        <Route path="/expertise3/:name" element={<ExpertProfile3 />} />
    </>
];

export default routes;