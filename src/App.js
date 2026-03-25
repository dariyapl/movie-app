
import './App.css';
import Loader from "./Components/Loader";
import MovieCard from "./Components/MovieCard";
import Navbar from "./Components/Navbar";
import './App.css'
import MoviesList from "./Components/MoviesList";

function App() {
  return (
    <div className="App">
        <Navbar />
        <MoviesList/>

    </div>
  );
}

export default App;
