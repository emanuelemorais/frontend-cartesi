import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Providers from "./providers/PrivyProviders";
import { steps } from "./utils/steps";
import { Layout } from "./components/vlayer/layout";

const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          <Routes>
            <Route path="/privy" element={<Home />} />
            <Route path="/" element={<Layout />}>
                {steps.map((step) => (
                  <Route
                    key={step.path}
                    path={step.path}
                    element={<step.component />}
                  />
                ))}
            </Route>
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
