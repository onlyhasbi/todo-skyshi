import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/header.component";
import DetailActivity from "./components/page/detail/detail-activity.component";
import MainActivity from "./components/page/main/main-activity.component";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainActivity />} />
        <Route path="/detail/:id" element={<DetailActivity />} />
      </Routes>
    </>
  );
}

export default App;
