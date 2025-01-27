export default function removeObjectById(data, id, parent) {
  if (id === parent._id) {
    return data.filter((item) => item._id !== parent._id);
  } else {
    const tempData = { ...parent };
    tempData.blocks = removePetFunc(parent.blocks, id);
    return tempData;
  }
}

function removePetFunc(data, id) {
  return data.reduce((acc, item) => {
    let updatedItem = { ...item };

    if (updatedItem.blocks) {
      updatedItem.blocks = removePetFunc(updatedItem.blocks, id);
    }
    if (updatedItem.id === id) {
      return acc;
    }
    acc.push(updatedItem);
    return acc;
  }, []);
}
