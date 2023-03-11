import {createContext, ReactNode, useState, FC} from 'react';
import {User, Inventory, AppContextType} from './types';
const defaultState: AppContextType = {
  user: null,
  inventory: [],
  setUser: () => {},
  setInventory: () => {},
};
const AppContext = createContext<AppContextType>(defaultState);

type Props = {
  children: ReactNode;
};

export const AppProvider: FC<Props> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [inventory, setInventory] = useState<Inventory[] | null>(null);
  return (
    <AppContext.Provider value={{user, setUser, inventory, setInventory}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
