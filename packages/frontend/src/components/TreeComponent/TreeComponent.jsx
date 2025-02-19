import css from "./TreeComponent.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../redux/diagram/operations";
import {
  selectDiagrams,
  setSelectedDiagram,
  setSelectedItem,
} from "../../redux/diagram/slice";
import Tree from "rc-tree";
import dataToTreeConvert from "../../helpers/converters/dataToTreeConvert";
import ControlPanel from "../ControlPanel/ControlPanel";
import {
  selectSelectedDiagram,
  selectSelectedItem,
} from "../../redux/diagram/selectors";
import findTopParentById from "../../helpers/findFatherById";

export default function TreeComponent() {
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);
  const selectedItem = useSelector(selectSelectedItem);
  const selectedDiagram = useSelector(selectSelectedDiagram);
  const [renameState, setRenameState] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      const tempData = findTopParentById(diagrams, selectedItem.key);
      dispatch(
        setSelectedDiagram(
          tempData
            ? tempData
            : diagrams.find(
                (diagram) => diagram._id === selectedItem.key
              )
        )
      );
    }
  }, [selectedItem, dispatch, diagrams]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <ControlPanel
        data={selectedItem}
        renameState={renameState}
        setRenameState={setRenameState}
      />
      <Tree
        treeData={dataToTreeConvert(diagrams)}
        onSelect={(_, { node }) => {
          const data = { ...node };
          if (data.selected) {
            dispatch(setSelectedItem(null));
            if (data.key === selectedDiagram)
              dispatch(setSelectedDiagram(null));
          } else {
            dispatch(setSelectedItem(data));
          }
        }}
        disabled={renameState}
      />
    </div>
  );
}
