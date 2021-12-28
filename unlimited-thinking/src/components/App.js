import Header from "./partials/Header.jsx"
import Footer from "./partials/Footer.jsx"
import FilmTimes from "./FilmTimes.jsx";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
    <Header />
<Switch>
<Route path="/home" />
<Route path="/times" />

<Route path="/value" />

</Switch>
    </Router>
    <FilmTimes />
    <Footer />


    </div>
  );
}

export default App;
