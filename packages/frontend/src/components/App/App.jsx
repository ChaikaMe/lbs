import { lazy } from "react";
import css from "./App.module.css";

const Canvas = lazy(() => import("../Canvas/Canvas.jsx"));
const TreeComponent = lazy(() =>
  import("../TreeComponent/TreeComponent.jsx")
);

function App() {
  return (
    <div className={css.container}>
      <TreeComponent />
      <Canvas />
    </div>
  );
}

export default App;
