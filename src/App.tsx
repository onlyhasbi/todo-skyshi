import { Route, Routes } from "react-router-dom";
import { useTodoStore } from "./store/todo";
import { lazy } from "react";
import MainActivity from "./components/page/main/main-activity.component";
import ModalDelete from "./components/element/modal-delete.component";
import ModalInformation from "./components/element/modal-information.component";
import Header from "./components/layout/header.component";
import DetailActivity from "./components/page/detail/detail-activity.component";

function App() {
  const isDeletedSucess = useTodoStore((state) => state.isDeletedSuccess);
  const setIsDeletedSuceess = useTodoStore(
    (state) => state.setIsDeletedSuccess
  );
  const deleteData = useTodoStore((state) => state.deleteData);
  const setDeleteData = useTodoStore((state) => state.setDeleteData);

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

      <ModalDelete
        isOpen={Boolean(deleteData)}
        onClose={() => setDeleteData(false)}
        data={deleteData as unknown as TDeleteData}
      />
    </>
  );
}

export default App;
