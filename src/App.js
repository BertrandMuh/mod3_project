import logo from './logo.svg';
import './App.css';

function App() {
  const testFunction = async () => {
    const response = await fetch('/test_route');
    console.log(response);

  }
  testFunction()
  return (
    <div className="App">
      <h1>Boiler Plate</h1>
    </div>
  );
}

export default App;