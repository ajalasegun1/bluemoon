import {Inventory} from '../context/types';

const getInventoryItem = (inventory: Inventory[] | null, name: string) => {
  if (inventory) {
    const filter = inventory.filter(
      item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    console.log({filter});
    if (filter.length > 0) {
      return filter[0];
    }
    return null;
  }
};

export default getInventoryItem;
