import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme/theme";
import ProductCard from "../../components/Product/ProductCard";

const MOCK_PRODUCTS = [
    {
        id: "1",
        slug: "premium-silk-saree",
        title: "Premium Banarasi Silk Saree",
        price: 4500,
        originalPrice: 8999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        isNew: true,
        rating: 4.8,
    },
    {
        id: "2",
        slug: "designer-kurta-set",
        title: "Embroidered Designer Kurta Set",
        price: 2499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
        isNew: false,
        rating: 4.5,
    },
    {
        id: "3",
        slug: "ethnic-party-wear",
        title: "Elegant Ethnic Party Wear",
        price: 3200,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1599032909756-5dee8c652ad7",
        isNew: true,
        rating: 4.2,
    },
    {
        id: "4",
        slug: "modern-lehenga-choli",
        title: "Modern Bridal Lehenga Choli",
        price: 12500,
        originalPrice: 25000,
        image: "https://images.unsplash.com/photo-1583391733975-642c3b53f89d",
        isNew: false,
        rating: 4.9,
    },
    {
        id: "5",
        slug: "printed-floral-dress",
        title: "Summer Printed Floral Dress",
        price: 1299,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
        isNew: false,
        rating: 4.0,
    },
    {
        id: "6",
        slug: "silk-cotton-salwar",
        title: "Silk Cotton Salwar Suit",
        price: 1800,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1560506840-ec148e82a604",
        isNew: true,
        rating: 4.4,
    },
];

const ProductScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Arrivals</Text>
                <Text style={styles.headerSubtitle}>Discover our latest collection</Text>
            </View>
            <FlatList
                data={MOCK_PRODUCTS}
                renderItem={({ item }) => <ProductCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.offWhite,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.charcoal,
    },
    headerSubtitle: {
        fontSize: 14,
        color: theme.colors.slate,
        marginTop: 4,
    },
    listContent: {
        paddingHorizontal: 8,
        paddingBottom: 24,
    },
    columnWrapper: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
});

export default ProductScreen;