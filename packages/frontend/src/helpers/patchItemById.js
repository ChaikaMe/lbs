export default function patchItemById(data, id, newData, type) {
  if (type === null || type === undefined)
    return console.error("Type is missing!");
  if (data._id === id) {
    return switchFunction(data, newData, type);
  } else {
    return {
      ...data,
      blocks: data.blocks.map((item) => {
        if (item.id === id) {
          return switchFunction(item, newData, type);
        }
        if (item.blocks.length > 0)
          return patchItemById(item, id, newData, type);

        return item;
      }),
    };
  }
}

function switchFunction(item, newData, type) {
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
