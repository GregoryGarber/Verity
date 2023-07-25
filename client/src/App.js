import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signIn/signInPage";
import SignUpPage from "./pages/signUp/signUpPage";
import HomePage from "./pages/home/homePage";
import VerityPage from "./pages/verity/verityPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/verity" element={<VerityPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
