import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signIn/signInPage";
import SignUpPage from "./pages/signUp/signUpPage";
import HomePage from "./pages/home/homePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
