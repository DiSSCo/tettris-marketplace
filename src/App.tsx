/* Import Dependencies */
import { BrowserRouter as Router, Routes } from 'react-router-dom';

/* Import Styles */
import './App.css';

/* Import Routes */
import routes from 'app/Routes';


const App = () => {
  return (
    <div className="h-100 w-100">
      <Router>
        <Routes>
          {routes}
        </Routes>
      </Router>
    </div>
  );
}


export default App;
