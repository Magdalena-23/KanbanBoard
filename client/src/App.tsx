import { ToastContainer } from "react-toastify";
import KanbanBoard from "./components/KanbanBoard";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <KanbanBoard />
    </>
  );
};

export default App;
