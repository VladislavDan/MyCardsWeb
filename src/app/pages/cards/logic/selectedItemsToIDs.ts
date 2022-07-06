export const selectedItemsToIDs = (selectedItems: { [p: number]: boolean }): number[] => {
    const ids = [];
    for (let a in selectedItems) {
        if (selectedItems[a]) {
            ids.push(Number(a));
        }
    }
    return ids;
}