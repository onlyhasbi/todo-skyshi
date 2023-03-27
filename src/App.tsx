import dayjs from "dayjs";
import "dayjs/locale/id";
import Header from "./components/layout/header.component";
import Content from "./components/page/main/main-content.component";
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
