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
import { useCallback, useEffect, useRef } from "react";
import NormalNode from "../NormalNode/NormalNode";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiagrams,
  setItemsState,
} from "../../redux/diagram/slice";
import { selectSelectedDiagram } from "../../redux/diagram/selectors";
import dataToNodesConvert from "../../helpers/dataToNodesConvert";
import patchItemById from "../../helpers/patchItemById";
import { patchItem } from "../../redux/diagram/operations";

const initialEdges = [];

const nodeTypes = {
  NormalNode,
};

export default function Canvas() {
  const diagrams = useSelector(selectDiagrams);
  const selectedDiagram = useSelector(selectSelectedDiagram);
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      changes.forEach((change) => {
        if (change.type === "position" && change.dragging === false) {
          const tempData = patchItemById(
            diagrams,
            change.id,
            change.position
          );
          dispatch(setItemsState(tempData));
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            const changedItem = diagrams.find(
              (diagram) => diagram._id === selectedDiagram
            );
            dispatch(
              patchItem({
                itemId: selectedDiagram,
                updatedData: changedItem,
              })
            );
          }, 2000);
        }
      });
    },
    [onNodesChange, diagrams, dispatch, selectedDiagram]
  );

  useEffect(() => {
    if (selectedDiagram) {
      const currentDiagram = dataToNodesConvert(
        diagrams.find((diagram) => diagram._id === selectedDiagram)
      );
      setNodes(currentDiagram);
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
