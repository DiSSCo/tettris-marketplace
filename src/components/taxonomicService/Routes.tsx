/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import TaxonomicService from "./TaxonomicService";


/* Routes associated with the Taxonomic Service page */
const routes = [
    <Route key="taxonomicService" path="/ts/:prefix/:suffix" element={<TaxonomicService />} />
];

export default routes;