import Header from "./components/layout/header.component";
import DetailActivity from "./components/page/detail/detail-activity.component";
import MainActivity from "./components/page/main/main-activity.component";
import ModalInformation from "./components/common/modal-information.component";
import { Route, Routes } from "react-router-dom";
import { useTodoStore } from "./store/todo";

function App() {
  const isDeletedSucess = useTodoStore((state) => state.isDeletedSuccess);
  const setIsDeletedSuceess = useTodoStore(
    (state) => state.setIsDeletedSuccess
  );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainActivity />} />
        <Route path="/detail/:id" element={<DetailActivity />} />
      </Routes>
      <ModalInformation
        isOpen={isDeletedSucess}
        onClose={() => setIsDeletedSuceess(false)}
      />
    </>
  );
}

export default App;
