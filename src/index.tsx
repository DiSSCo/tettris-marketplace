/* Import Dependencies */
import ReactDOM from 'react-dom/client';

/* Import Components */
import App from './App';


const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <App />
  );
}

RenderRoot();