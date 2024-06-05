/* Import Dependencies */
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Import Store */
import { setupStore } from 'app/Store';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

/* Import Components */
import App from './App';


/* Define Axios base url */
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/cordra/doip/0.DOIP`;

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

RenderRoot();