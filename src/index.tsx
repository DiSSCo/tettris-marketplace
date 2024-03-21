/* Import Dependencies */
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import KeycloakService from 'app/Keycloak';

/* Import Store */
import { setupStore } from 'app/Store';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Import Components */
import App from './App';


/* Define Axios base url */
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/v1`;

/* Function that renders the root */
const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={setupStore()}>
      <App />
    </Provider>
  );
}

KeycloakService.InitKeyCloak(RenderRoot);