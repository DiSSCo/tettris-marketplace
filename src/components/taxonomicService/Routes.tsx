/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import TaxonomicService from "./TaxonomicService";
import TaxonomicServiceForm from "./TaxonomicServiceForm";


/* Routes associated with the Taxonomic Service page */
const routes = [
    <Route key="taxonomicService" path="/ts/:prefix/:suffix" element={<TaxonomicService />} />,
    <Route key="taxonomicServiceForm" path="/ts/suggestNewTaxonomicService" element={<TaxonomicServiceForm />} />
];

export default routes;