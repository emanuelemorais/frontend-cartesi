import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Providers from "./providers/PrivyProviders";

const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
