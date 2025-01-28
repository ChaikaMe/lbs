export default function dataToTreeConvert(data) {
  return data.map((item) => {
    return {
      key: item._id || item.id,
      title: item.diagramName || item.name,
      children:
        Array.isArray(item.blocks) && item.blocks.length > 0
          ? dataToTreeConvert(item.blocks)
          : [],
    };
  });
}
