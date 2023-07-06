import RouteList from './Route';
import ErrorBoundary from './components/atoms/ErrorBoundary'
import {
  BrowserRouter as Router,
} from 'react-router-dom';



const App =()=> {

  return (
    

    <ErrorBoundary>  
    <Router>    
      <RouteList/>
    </Router>
    </ErrorBoundary>  

  
  );
}

 export default App;
