import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import ProductScreen from "../Screens/ProductScreen/ProductScreen";
import CheckoutScreen from "../Screens/CheckoutScreen/CheckoutScreen";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import TabNavigator from "./TabNavigator";
import SearchScreen from "../Screens/SearchScreen/SearchScreen";
import WishListScreen from "../Screens/WishList/WishListScreen";
import ProductDetailsScreen from "../Screens/ProductScreen/ProductDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="WishList" component={WishListScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </Stack.Navigator>
    );
}