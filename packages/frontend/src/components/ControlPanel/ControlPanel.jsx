/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import css from "./ControlPanel.module.css";
import {
  selectDiagrams,
  setItemsState,
  setSelectedDiagram,
  setSelectedItem,
} from "../../redux/diagram/slice";
import removeObjectById from "../../helpers/removeObjectById";
import { deleteItem, postItem } from "../../redux/diagram/operations";
import { useState } from "react";
import patchItemById from "../../helpers/patchItemById";
import { v4 as uuidv4 } from "uuid";
import { selectSelectedDiagram } from "../../redux/diagram/selectors";
import patchDataInDiagram from "../../helpers/diagram/patchBlockInDiagram";
import newDataExample from "../../utils/newDataExample";
import patchTypes from "../../utils/patchTypes";

export default function ControlPanel({
  data,
  renameState,
  setRenameState,
}) {
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);
  const choosedDiagram = useSelector(selectSelectedDiagram);

  const [inputValue, setInputValue] = useState(
    data ? data.title : "-"
  );

  const onDelete = (key) => {
    const tempData = removeObjectById(diagrams, key, choosedDiagram);
    if (key === choosedDiagram._id) {
      dispatch(deleteItem(key))
        .then(dispatch(setItemsState(tempData)))
        .then(dispatch(setSelectedDiagram(null)))
        .catch((error) => console.error(error));
    } else {
      patchDataInDiagram(diagrams, tempData, dispatch);
    }
    dispatch(setSelectedItem(null));
  };
  const onRenameToggle = (key) => {
    if (renameState && inputValue !== "-") {
      const tempData = patchItemById(
        choosedDiagram,
        key,
        inputValue,
        patchTypes.onRename
      );
      patchDataInDiagram(diagrams, tempData, dispatch);
      dispatch(
        setSelectedItem({
          ...data,
          title: inputValue,
        })
      );
    }
    setInputValue(data.title);
    setRenameState((prev) => !prev);
  };
  const onCreate = (data) => {
    if (data === null) {
      dispatch(postItem(newDataExample.diagram));
    } else {
      const randomId = uuidv4();
      const newBlock = { ...newDataExample.block, id: randomId };
      const tempData = patchItemById(
        choosedDiagram,
        data.key,
        newBlock,
        patchTypes.onCreate
      );
      patchDataInDiagram(diagrams, tempData, dispatch);
    }
  };

  return (
    <div className={css.container}>
      {renameState ? (
        <input
          className={css.input}
          value={data ? inputValue : "-"}
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : (
        <h3 className={css.title}>{data ? data.title : "-"}</h3>
      )}
      <div className={css.buttonWrapper}>
        <button
          className={css.button}
          onClick={() => onDelete(data.key)}
          disabled={renameState || !data}
        >
          Delete
        </button>
        <button
          className={css.button}
          onClick={() => onRenameToggle(data.key)}
          disabled={inputValue === "" || !data}
        >
          {renameState ? "Accept" : "Rename"}
        </button>
        <button
          className={css.button}
          onClick={() => onCreate(data)}
          disabled={renameState}
        >
          Create
        </button>
      </div>
    </div>
  );
}
