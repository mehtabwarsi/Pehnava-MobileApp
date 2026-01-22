import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { theme } from '../../theme/theme';
import CollectionCard from '../../components/Collection/CollectionCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COLLECTIONS_MOCK = [
    {
        id: '1',
        slug: 'banarasi-saree',
        title: 'Banarasi Saree',
        subtitle: 'Ancient weaving traditions meet modern elegance in these hand-loomed treasures.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
        isLarge: true
    },
    {
        id: '2',
        slug: 'designer-kurta',
        title: 'Designer Kurta',
        subtitle: 'Premium fabrics and hand-stitched detailing for every occasion.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
        isLarge: false
    },
    {
        id: '3',
        slug: 'wedding-essentials',
        title: 'Wedding Luxe',
        subtitle: 'Grand attire for your most memorable moments.',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
        isLarge: false
    },
    {
        id: '4',
        slug: 'summer-edit',
        title: 'Summer Edit',
        subtitle: 'Light, breathable textures for the conscious modern woman.',
        image: 'https://i.pinimg.com/736x/83/61/36/8361360a654e7bbc2b5f5d204c1a44d6.jpg',
        isLarge: true
    }
];

const CollectionScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Cinematic Discovery Header */}
                <View style={styles.header}>

                    <Text style={styles.headerTitle}>Curated{"\n"}Collections</Text>
                    <Text style={styles.headerSubtitle}>
                        Explore our handpicked selection of artisanal designs,
                        crafted for the timeless modern woman.
                    </Text>

                    <View style={styles.categoryPills}>
                        <TouchableOpacity style={[styles.pill, styles.activePill]}>
                            <Text style={[styles.pillText, styles.activePillText]}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pill}>
                            <Text style={styles.pillText}>Silk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pill}>
                            <Text style={styles.pillText}>Cotton</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pill}>
                            <Text style={styles.pillText}>Wedding</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 2. Varied Visual Rhythm Collection Grid */}
                <View style={styles.gridContainer}>
                    {COLLECTIONS_MOCK.map((collection) => (
                        <CollectionCard
                            key={collection.id}
                            title={collection.title}
                            subtitle={collection.subtitle}
                            image={collection.image}
                            isLarge={collection.isLarge}
                            onPress={() => {
                                console.log(`Navigating to collection: ${collection.slug}`);
                            }}
                        />
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
        // backgroundColor: theme.colors.white,
        backgroundColor: '#F8F9FA'
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    breadcrumbText: {
        fontSize: 10,
        fontWeight: '800',
        color: theme.colors.slate,
        letterSpacing: 1,
    },
    breadcrumbActive: {
        color: theme.colors.charcoal,
    },
    filterBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: theme.colors.charcoal,
        lineHeight: 42,
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: 14,
        color: theme.colors.slate,
        lineHeight: 20,
        marginTop: 12,
        maxWidth: '85%',
        fontWeight: '500',
    },
    categoryPills: {
        flexDirection: 'row',
        marginTop: 24,
        gap: 8,
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
    },
    activePill: {
        backgroundColor: theme.colors.charcoal,
    },
    pillText: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.slate,
    },
    activePillText: {
        color: theme.colors.white,
    },
    gridContainer: {
        paddingHorizontal: 20,
    },
});

export default CollectionScreen;