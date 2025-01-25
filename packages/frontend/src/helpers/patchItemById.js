export default function patchItemById(data, id, newData, type) {
  if (type === null || type === undefined)
    return console.error("Type is missing!");
  return data.map((item) => {
    if (item.id === id || item._id === id) {
      switch (type) {
        case "position": {
          const tempData = { ...item.position, ...newData };
          return { ...item, position: tempData };
        }
        case "newBlock": {
          const tempData = [...item.blocks, newData];
          return { ...item, blocks: tempData };
        }
        case "newName": {
          const tempData =
            item._id === undefined
              ? { name: newData }
              : { diagramName: newData };
          return { ...item, ...tempData };
        }
        default:
          console.error("Such type does not exist!");
          break;
      }
    }
    if (item.blocks) {
      return {
        ...item,
        blocks: patchItemById(item.blocks, id, newData, type),
      };
    }
    return item;
  });
}
