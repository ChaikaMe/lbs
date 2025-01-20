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
import dataToTreeConvert from "../../helpers/dataToTreeConvert";
import ControlPanel from "../ControlPanel/ControlPanel";
import { selectSelectedItem } from "../../redux/diagram/selectors";
import findTopParentById from "../../helpers/findFatherById";

export default function TreeComponent() {
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);
  const selectedItem = useSelector(selectSelectedItem);
  const [renameState, setRenameState] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      const tempData = findTopParentById(diagrams, selectedItem.key);
      dispatch(
        setSelectedDiagram(tempData ? tempData : selectedItem.key)
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
          } else {
            dispatch(setSelectedItem(data));
          }
        }}
        disabled={renameState}
      />
    </div>
  );
}
