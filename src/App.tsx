import Header from "./components/layout/header.component";
import DetailActivity from "./components/page/detail/detail-activity.component";
import MainActivity from "./components/page/main/main-activity.component";
import ModalInformation from "./components/common/modal-information.component";
import ModalDelete from "./components/common/modal-delete.component";
import { Route, Routes } from "react-router-dom";
import { useTodoStore } from "./store/todo";

function App() {
  const isDeletedSucess = useTodoStore((state) => state.isDeletedSuccess);
  const setIsDeletedSuceess = useTodoStore(
    (state) => state.setIsDeletedSuccess
  );

  const isDelete = useTodoStore((state) => state.isDelete);
  const setIsDelete = useTodoStore((state) => state.setIsDelete);
  const deleteData = useTodoStore((state) => state.deleteData);

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
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        data={deleteData}
      />
    </>
  );
}

export default App;
