export default function dataToNodesConvert(data) {
  const result = [];
  for (const element of data.blocks) {
    blockTransformation(element, null, result);
  }
  return result;
}

function blockTransformation(item, parentId, result) {
  const tempData = {
    id: item.id,
    type: "NormalNode",
    data: { label: item.name },
    position: { ...item.position },
    parentNode: parentId || null,
  };
  result.push(tempData);

  if (Array.isArray(item.blocks) && item.blocks.length > 0) {
    for (const child of item.blocks) {
      blockTransformation(child, item.id, result);
    }
  }
}
