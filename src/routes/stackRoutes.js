import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../pages/home";
import { Detail } from "../pages/detail";
import { Search } from "../pages/search";

const stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <stack.Navigator initialRouteName="Home">
      <stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Detalhes da receita" }}
      />
      <stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Veja o que encontramos" }}
      />
    </stack.Navigator>
  );
}
