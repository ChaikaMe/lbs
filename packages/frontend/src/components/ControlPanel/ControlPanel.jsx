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
import findParentById from "../../helpers/findFatherById";
import {
  deleteItem,
  patchItem,
  postItem,
} from "../../redux/diagram/operations";
import { useState } from "react";
import patchItemById from "../../helpers/patchItemById";
import { v4 as uuidv4 } from "uuid";

export default function ControlPanel({
  data,
  renameState,
  setRenameState,
}) {
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);

  const onDelete = (key) => {
    const tempData = removeObjectById(diagrams, key);
    if (diagrams.find((diagram) => diagram._id === key)) {
      dispatch(deleteItem(key)).then(
        dispatch(setItemsState(tempData))
      );
    } else {
      const parentId = findParentById(diagrams, key);
      const changedItem = tempData.filter(
        (diagram) => diagram._id === parentId
      )[0];
      dispatch(
        patchItem({ itemId: parentId, updatedData: changedItem })
      ).then(dispatch(setItemsState(tempData)));
    }
    dispatch(setSelectedItem(null));
    dispatch(setSelectedDiagram(null));
  };

  const [inputValue, setInputValue] = useState(
    data ? data.title : "-"
  );
  const onRenameToggle = (key) => {
    if (renameState && inputValue !== "-") {
      const tempData = patchItemById(diagrams, key, inputValue);
      if (tempData.some((diagram) => diagram._id === key)) {
        const diagram = tempData.find(
          (diagram) => diagram._id === key
        );
        dispatch(
          patchItem({
            itemId: diagram._id,
            updatedData: diagram,
          })
        ).then(dispatch(setItemsState(tempData)));
      } else {
        const parentId = findParentById(diagrams, key);
        const changedItem = tempData.filter(
          (diagram) => diagram._id === parentId
        )[0];
        dispatch(
          patchItem({
            itemId: parentId,
            updatedData: changedItem,
          })
        ).then(dispatch(setItemsState(tempData)));
      }
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
      const tempData = {
        diagramName: "New Diagram",
        blocks: [],
        connections: [],
      };
      dispatch(postItem(tempData));
    } else {
      const randomId = uuidv4();
      const newBlock = {
        name: "New Block",
        blocks: [],
        position: { x: 0, y: 0 },
        id: randomId,
      };
      const tempData = patchItemById(diagrams, data.key, newBlock);
      if (tempData.some((diagram) => diagram._id === data.key)) {
        const diagram = tempData.find(
          (diagram) => diagram._id === data.key
        );
        dispatch(
          patchItem({
            itemId: diagram._id,
            updatedData: diagram,
          })
        ).then(dispatch(setItemsState(tempData)));
      } else {
        const parentId = findParentById(diagrams, data.key);
        const changedItem = tempData.filter(
          (diagram) => diagram._id === parentId
        )[0];
        dispatch(
          patchItem({
            itemId: parentId,
            updatedData: changedItem,
          })
        ).then(dispatch(setItemsState(tempData)));
      }
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
          disabled={renameState}
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
