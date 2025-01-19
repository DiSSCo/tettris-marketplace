/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import TaxonomicExpertForm from "./TaxonomicExpertForm";


/* Routes associated with the Expertise page */
const routes = [
    <Route key="TaxonomicExpertForm" path="/te/registerYourExpertise" element={<TaxonomicExpertForm />} />
];

export default routes;