export default function removeObjectById(data, id) {
  return data.reduce((acc, item) => {
    let updatedItem = { ...item };

    if (updatedItem.blocks) {
      updatedItem.blocks = removeObjectById(updatedItem.blocks, id);
    }
    if (updatedItem.id === id || updatedItem._id === id) {
      return acc;
    }
    acc.push(updatedItem);
    return acc;
  }, []);
}
