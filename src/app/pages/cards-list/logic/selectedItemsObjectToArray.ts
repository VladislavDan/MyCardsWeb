export const selectedItemsObjectToArray = (selectedItemsObject: {[key: number]: boolean}): number[] => {
    const array: number[] = [];
    for (let item in selectedItemsObject) {
        array.push(Number(item));
    }
    return array
}