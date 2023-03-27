import Header from "./components/header.component";
import Content from "./components/main-content.component";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";

function App() {
  dayjs.locale("id");
  const { pathname } = useLocation();

  return (
    <Suspense fallback="Loading">
      <Header />
      <main className="w-full h-full">
        {pathname === "/" ? <Content /> : <Outlet />}
      </main>
    </Suspense>
  );
}

export default App;
