/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "components/home/Home";
import Search from "components/search/Search";
import TaxonomicService from "components/taxonomicService/TaxonomicService";
import TaxonomicServiceForm from "components/taxonomicService/TaxonomicServiceForm";
import Expertise from "components/expertise/Expertise";
import NotFound404 from "components/general/NotFound404/NotFound404";


/* Routes for application */
const routes = [
    /* Home */
    <Route key="home" path="/" element={<Home />} />,
    /* Search */
    <Route key="search" path="/search" element={<Search />} />,
    /* Taxonomic Service */
    <Route key="taxonomicService" path="/ts/:prefix/:suffix/:version?" element={<TaxonomicService />} />,
    <Route key="taxonomicService/add" path="/ts/add" element={<TaxonomicServiceForm />} />,
    /* Expertise */
    <Route key="expertise" path="/expertise" element={<Expertise />} />,
    /* 404 */
    <Route key="404" path="*" element={<NotFound404 />} />
];


export default routes;