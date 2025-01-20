export default function patchItemById(data, id, newData) {
  return data.map((item) => {
    if (item.id === id || item._id === id) {
      if (
        newData !== null &&
        typeof newData === "object" &&
        !Array.isArray(newData)
      ) {
        if (!("x" in newData) && !("y" in newData)) {
          const tempData = [...item.blocks, newData];
          return { ...item, blocks: tempData };
        } else {
          const tempData = { ...item.position, ...newData };
          return { ...item, position: tempData };
        }
      } else {
        const tempData =
          item._id === undefined
            ? { name: newData }
            : { diagramName: newData };
        return { ...item, ...tempData };
      }
    }
    if (item.blocks) {
      return {
        ...item,
        blocks: patchItemById(item.blocks, id, newData),
      };
    }
    return item;
  });
}
