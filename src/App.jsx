import LogIn from "./components/login/LogIn";
import Profiler from "./components/profiler/Profiler";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="app-container"
      >
        <LogIn />
        <Profiler />
      </div>
    </div>
  );
}

export default App;
