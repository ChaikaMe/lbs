import { patchItem } from "../../redux/diagram/operations";
import { setItemsState } from "../../redux/diagram/slice";

export default function patchDataInDiagram(
  diagrams,
  tempData,
  dispatch
) {
  const index = diagrams.findIndex(
    (diagram) => diagram._id === tempData._id
  );
  if (index !== -1) {
    const newDiagrams = [...diagrams];
    newDiagrams[index] = tempData;
    dispatch(
      patchItem({
        itemId: tempData._id,
        updatedData: tempData,
      })
    )
      .then(dispatch(setItemsState(newDiagrams)))
      .catch((error) => console.error(error));
  } else {
    console.error("Such diagram does not exist!");
  }
}
