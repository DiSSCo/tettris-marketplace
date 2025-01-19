/* Import Dependencies */
import { Route } from 'react-router-dom';

/* Import Routes */
import ExpertiseRoutes from 'components/taxonomicExpert/Routes';
import HomeRoutes from 'components/home/Routes';
import NotFound404 from 'components/general/NotFound404/NotFound404';
import SearchRoutes from 'components/search/Routes';
import TaxonomicServiceRoutes from 'components/taxonomicService/Routes';


/* Routes for application */
const AppRoutes: JSX.Element[] = [
    ...ExpertiseRoutes,
    ...HomeRoutes,
    ...SearchRoutes,
    ...TaxonomicServiceRoutes,
    <Route key="404" path="*" element={<NotFound404 />} />
];

export default AppRoutes;