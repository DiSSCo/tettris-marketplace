/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "components/home/Home";
import Search from "components/search/Search";


/* Routes for application */
const routes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="search" path="/search" element={<Search />} />
];


export default routes;