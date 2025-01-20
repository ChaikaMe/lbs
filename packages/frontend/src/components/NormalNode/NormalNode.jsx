/* eslint-disable react/prop-types */
import { memo } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  NodeToolbar,
} from "@xyflow/react";

const NormalNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected ? selected : false}
        minWidth={50}
        minHeight={50}
      />
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        <button>Edit</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          padding: 10,
          backgroundColor: "white",
          height: "100%",
          borderRadius: 12,
          border: "solid black 1px",
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 
              0 1px 3px rgba(0, 0, 0, 0.08)`,
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default memo(NormalNode);
