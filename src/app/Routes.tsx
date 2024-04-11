/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "components/home/Home";
import Search from "components/search/Search";
import TaxonomicService from "components/taxonomicService/TaxonomicService";
import TaxonomicServiceForm from "components/taxonomicService/TaxonomicServiceForm";


/* Routes for application */
const routes = [
    /* Home */
    <Route key="home" path="/" element={<Home />} />,
    /* Search */
    <Route key="search" path="/search" element={<Search />} />,
    /* Taxonomic Service */
    <Route key="taxonomicService" path="/ts" element={<TaxonomicService />} />,
    <Route key="taxonomicService/add" path="/ts/add" element={<TaxonomicServiceForm />} />
];


export default routes;