import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fallback } from "./components/molecules/FallBack";

const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const DetailPage = React.lazy(() => import("./components/pages/DetailPage"));

const App:React.FC = () => {
  
  return (
    <BrowserRouter>
      <Suspense fallback={Fallback}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:symbol" element={<DetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
