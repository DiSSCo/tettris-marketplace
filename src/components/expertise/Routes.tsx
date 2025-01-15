/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Expertise from "./Expertise";
import ExpertForm from "./ExpertForm";


/* Routes associated with the Expertise page */
const routes = [
    <Route key="expertise" path="/expertise" element={<Expertise />} />,
    <Route key="expertForm" path="/expert-register" element={<ExpertForm />} />
];

export default routes;