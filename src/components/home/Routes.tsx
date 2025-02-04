/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "./Home";
import Dev from "components/general/devPage/dev";


/* Routes associated with the Home page */
const routes = [
    <Route key="home" path="/" element={<Home />} />,
    // Redirection to dev page
    <Route key="Expertise" path="/taxonomicExpert" element={<Dev />} />,
    <Route key="Collection" path="/ReferenceCollection" element={<Dev />} />,
];

export default routes;