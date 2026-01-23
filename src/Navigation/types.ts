export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Main: undefined; // This will hold the Bottom Tab Navigator
    Product: { id: string };
    ProductDetails: undefined
    Checkout: undefined;
    Search: undefined;
    WishList: undefined;
};

export type TabParamList = {
    HomeTab: undefined;
    CollectionTab: undefined;
    CartTab: undefined;
    ProfileTab: undefined;
};