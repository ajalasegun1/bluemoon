export type User = {
  email: string;
  password: string;
};

export type Inventory = {
  name: string;
  total: string;
  price: string;
  desc: string;
  email: string;
};

export type AppContextType = {
  user: User | null;
  inventory: Inventory[] | null;
  setUser: (user: User | null) => void;
  setInventory: (inventory: Inventory[] | null) => void;
};
