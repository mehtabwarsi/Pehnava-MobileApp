import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/Header/HomeHeader";
import Catalog from "../../components/Catalog/CataLog";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import ProductCard from "../../components/Product/ProductCard";

const MOCK_CATEGORIES_MEN = [
    {
        _id: '1',
        title: 'Premium Shirts',
        subtitle: '120+',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
        gender: 'Men',
    },
    {
        _id: '2',
        title: 'Denim Jeans',
        subtitle: '85+',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
        gender: 'Men',
    },
    {
        _id: '3',
        title: 'Luxury Suits',
        subtitle: '40+',
        image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f6f9?q=80&w=600&auto=format&fit=crop',
        gender: 'Men',
    },
];

const MOCK_CATEGORIES_WOMEN = [
    {
        _id: '4',
        title: 'Summer Dresses',
        subtitle: '150+',
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop',
        gender: 'Women',
    },
    {
        _id: '5',
        title: 'Elegant Sarees',
        subtitle: '200+',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
        gender: 'Women',
    },
    {
        _id: '6',
        title: 'Western Wear',
        subtitle: '95+',
        image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=600&auto=format&fit=crop',
        gender: 'Women',
    },
];

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
];

const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState<'Men' | 'Women' | 'All'>('All');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerWrapper}>
                <HomeHeader
                    activeTab={activeCategory}
                    onTabChange={setActiveCategory}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <HomeCarousel />
                {activeCategory === 'All' ? (
                    <>
                        <Catalog
                            title="Catalog"
                            gender="Men"
                            description="Timeless styles crafted for the modern man. Experience premium quality in every thread."
                            categories={MOCK_CATEGORIES_MEN}
                        />
                        <Catalog
                            title="Catalog"
                            gender="Women"
                            description="Discover the latest trends in women's fashion. Elegance meet contemporary design."
                            categories={MOCK_CATEGORIES_WOMEN}
                        />
                    </>
                ) : activeCategory === 'Men' ? (
                    <>
                        <Catalog
                            title="Catalog"
                            gender="Men"
                            description="Timeless styles crafted for the modern man. Experience premium quality in every thread."
                            categories={MOCK_CATEGORIES_MEN}
                        />
                        <Catalog
                            title="Catalog"
                            gender="Women"
                            description="Discover the latest trends in women's fashion. Elegance meet contemporary design."
                            categories={MOCK_CATEGORIES_WOMEN}
                        />
                    </>
                ) : (
                    <>
                        <Catalog
                            title="Catalog"
                            gender="Women"
                            description="Discover the latest trends in women's fashion. Elegance meet contemporary design."
                            categories={MOCK_CATEGORIES_WOMEN}
                        />
                        <Catalog
                            title="Catalog"
                            gender="Men"
                            description="Timeless styles crafted for the modern man. Experience premium quality in every thread."
                            categories={MOCK_CATEGORIES_MEN}
                        />
                    </>
                )}

                {/* New Arrivals Section */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>New Arrivals</Text>
                        <Text style={styles.sectionSubtitle}>Handpicked for your style</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productGrid}>
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.offWhite,
    },
    headerWrapper: {
        marginHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: theme.colors.slate,
        marginTop: 2,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
});

export default HomeScreen;