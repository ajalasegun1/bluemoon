import {Inventory} from '../context/types';

const checkAvailability = (data: Inventory[] | null, name: string) => {
  if (data) {
    const result = data.filter(
      item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    console.log({avaiala: result});
    if (result.length > 0) {
      return true;
    }
    return false;
  }
};
export default checkAvailability;
