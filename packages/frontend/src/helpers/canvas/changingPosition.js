import { patchItem } from "../../redux/diagram/operations";
import { setItemsState } from "../../redux/diagram/slice";
import patchItemById from "../patchItemById";

export default function changingPosition(
  diagrams,
  change,
  selectedDiagram,
  dispatch
) {
  const tempData = patchItemById(
    diagrams,
    change.id,
    change.position,
    change.type
  );
  const changedItem = tempData.find(
    (diagram) => diagram._id === selectedDiagram._id
  );
  dispatch(
    patchItem({
      itemId: selectedDiagram._id,
      updatedData: changedItem,
    })
  ).then(dispatch(setItemsState(tempData)));
}
