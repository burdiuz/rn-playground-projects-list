export const defaultIsSelectedItem = (currentItem, selectedItem) =>
  currentItem && selectedItem && currentItem.path === selectedItem.path;

export const defaultIsSelectedItemParent = (currentItem, selectedItem) =>
  currentItem &&
  selectedItem &&
  selectedItem.path !== currentItem.path &&
  (selectedItem.path.indexOf(`${currentItem.path}/`) === 0 ||
    selectedItem.path.indexOf(`${currentItem.path}\\`) === 0);
