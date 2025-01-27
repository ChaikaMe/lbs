import css from "./Canvas.module.css";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeToolbar,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";
import NormalNode from "../NormalNode/NormalNode";
import { useDispatch, useSelector } from "react-redux";
import { selectDiagrams } from "../../redux/diagram/slice";
import { selectSelectedDiagram } from "../../redux/diagram/selectors";
import dataToNodesConvert from "../../helpers/dataToNodesConvert";
import changingPosition from "../../helpers/canvas/changingPosition";

const initialEdges = [];

const nodeTypes = {
  NormalNode,
};

export default function Canvas() {
  const diagrams = useSelector(selectDiagrams);
  const selectedDiagram = useSelector(selectSelectedDiagram);
  const dispatch = useDispatch();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      changes.forEach((change) => {
        if (change.type === "position" && change.dragging === false) {
          changingPosition(
            diagrams,
            change,
            selectedDiagram,
            dispatch
          );
        }
        if (
          change.type === "dimensions" &&
          change.resizing === true
        ) {
          console.log("+");
        }
      });
    },
    [onNodesChange, diagrams, dispatch, selectedDiagram]
  );
  useEffect(() => {
    if (selectedDiagram) {
      setNodes(dataToNodesConvert(selectedDiagram));
    } else {
      setNodes([]);
    }
  }, [selectedDiagram, diagrams, setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={css.container}>
      {diagrams.length > 0 && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <NodeToolbar />
        </ReactFlow>
      )}
    </div>
  );
}
