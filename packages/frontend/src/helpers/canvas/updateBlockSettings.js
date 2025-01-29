import patchDataInDiagram from "../diagram/patchDataInDiagram";
import patchItemById from "../patchItemById";

export default function updateBlockSettings(
  diagrams,
  change,
  dispatch,
  selectedDiagram
) {
  const tempData = patchItemById(
    selectedDiagram,
    change.id,
    change,
    change.type
  );
  patchDataInDiagram(diagrams, tempData, dispatch);
}
