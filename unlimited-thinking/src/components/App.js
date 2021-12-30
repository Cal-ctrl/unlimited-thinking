import Header from "./partials/Header.jsx"
import Footer from "./partials/Footer.jsx"
import FilmTimes from "./FilmTimes.jsx";
import Value from "./Value.jsx"
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Homepage from "./partials/Homepage.jsx";

function App() {
  return (
    <div>
    <Router>
    <Header />
<Switch>
<Route path="/" element={<Homepage/>} />
<Route path="/home" element={<Homepage/>}/>
<Route path="/times" element={<FilmTimes />}/>

<Route path="/value" element={<Value />}/>

</Switch>
    </Router>
    <Footer />


    </div>
  );
}

export default App;
