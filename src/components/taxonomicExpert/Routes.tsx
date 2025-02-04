/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import TaxonomicExpertForm from "./TaxonomicExpertForm";
import TaxonomicExpert from "./TaxonomicExpert";


/* Routes associated with the Expertise page */
const routes = [
    <Route key="taxonomicExpert" path="/te/:prefix/:suffix" element={<TaxonomicExpert />} />,
    <Route key="TaxonomicExpertForm" path="/te/registerYourExpertise" element={<TaxonomicExpertForm />} />
];

export default routes;