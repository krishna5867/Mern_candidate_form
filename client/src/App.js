import './App.css';
import {CandidateForm} from './components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <CandidateForm />
    </div>
  );
}

export default App;


