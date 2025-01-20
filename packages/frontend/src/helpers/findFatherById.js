export default function findTopParentById(data, id) {
  for (const element of data) {
    if (element.blocks && element.blocks.length > 0) {
      const found = findElementById(element.blocks, id);
      if (found) {
        return element._id;
      } else {
        const parent = findTopParentById(element.blocks, id);
        if (parent) {
          return parent._id;
        }
      }
    }
  }
  return null;
}

function findElementById(blocks, id) {
  for (const block of blocks) {
    if (block._id === id || block.id === id) {
      return block;
    }
    if (block.blocks && block.blocks.length > 0) {
      const found = findElementById(block.blocks, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
