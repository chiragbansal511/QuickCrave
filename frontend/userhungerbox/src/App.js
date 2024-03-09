import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import Signup from "./pages/signup";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    <PrivateRoute />
    </>
  );
}

export default App;
