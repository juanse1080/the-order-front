import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { RestaurantSession } from '../interfaces';

interface UserContextValue {
  restaurant: RestaurantSession;
  handleRestaurant: (user: RestaurantSession) => void;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [restaurant, setRestaurant] = useState<RestaurantSession>({
    id: +import.meta.env.VITE_RESTAURANT_ID!
  } as RestaurantSession);

  const handleRestaurant = (user: RestaurantSession) => {
    setRestaurant(user);
  };

  useEffect(() => {
    const onLoad = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/restaurant/${restaurant.id}`)
        .then((response) => response.json())
        .then((data) => {
          setRestaurant(data);
        });
    };

    onLoad();
  }, []);

  return (
    <UserContext.Provider value={{ restaurant, handleRestaurant }}>
      {children}
    </UserContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const { restaurant } = useContext(UserContext);
  return { restaurant };
};
