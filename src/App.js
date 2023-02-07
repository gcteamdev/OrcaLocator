import './App.css';
import Nav from './Nav';
import LocationLists from './components/LocationLists';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div className="App">
     
      <div className="header">
        <h1> Orca Locator</h1>
      </div>
       <LocationLists />
       <MapContainer /> 
    </div>
  );
}

export default App;
