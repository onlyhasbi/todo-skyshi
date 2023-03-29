import Header from "./components/layout/header.component";
import DetailActivity from "./components/page/detail/detail-activity.component";
import MainActivity from "./components/page/main/main-activity.component";
import Modal from "./components/common/modal.component";
import circleWarning from "./assets/warning-circle.svg";
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
      <Modal
        className="flex items-center h-[3.625rem]"
        isOpen={isDeletedSucess}
        onClose={() => setIsDeletedSuceess(false)}
      >
        <div className="ml-[1.875rem] flex gap-x-[0.8125rem] items-center" data-cy="modal-information">
          <img src={circleWarning} alt="circle-warning-icon" data-cy="modal-information-icon"/>
          <p className="font-medium text-sm" data-cy="modal-information-title">Activity berhasil dihapus</p>
        </div>
      </Modal>
    </>
  );
}

export default App;
