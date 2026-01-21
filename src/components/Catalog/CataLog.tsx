import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55; // Reduced from 0.75
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface Category {
    _id: string;
    title: string;
    subtitle: string;
    image: string;
    gender: string;
    redirectUrl?: string;
}

interface CatalogProps {
    title: string;
    description: string;
    categories: Category[];
    gender?: string;
}

const Catalog: React.FC<CatalogProps> = ({ title, description, categories, gender }) => {
    const navigation = useNavigation<any>();

    if (!categories || categories.length === 0) return null;

    const renderItem = ({ item, index }: { item: Category; index: number }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.cardContainer,
                { marginLeft: index === 0 ? 20 : 12, marginRight: index === categories.length - 1 ? 20 : 0 }
            ]}
            onPress={() => {
                if (item.redirectUrl) {
                    // Logic for custom redirect if needed
                    console.log('Redirecting to:', item.redirectUrl);
                } else {
                    navigation.navigate('Shop', {
                        gender: item.gender,
                        subCategory: item.title
                    });
                }
            }}
        >
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.cardImage}
                imageStyle={styles.imageStyle}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(31, 31, 31, 0.3)', 'rgba(31, 31, 31, 0.3)']}
                    style={styles.gradient}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.cardSubtitle}>
                            {item.subtitle} ITEMS
                        </Text>
                        <Text style={styles.cardTitle}>
                            {item.title}
                        </Text>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Explore</Text>
                            <Icon name="arrow-right" size={14} color={theme.colors.white} />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{title} </Text>
                    {gender && <Text style={styles.genderTitle}>{gender}</Text>}
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>

            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item, index) => item._id || index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 12}
                decelerationRate="fast"
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    title: {
        fontSize: 22, // Reduced from 28
        fontWeight: '800',
        color: theme.colors.charcoal,
        letterSpacing: -0.5,
    },
    genderTitle: {
        fontSize: 22, // Reduced from 28
        fontWeight: '800',
        color: theme.colors.primary,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 13,
        color: theme.colors.slate,
        lineHeight: 18,
        maxWidth: '90%',
    },
    listContainer: {
        paddingBottom: 8,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 10,
    },
    cardImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderRadius: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16, // Reduced from 24
        borderRadius: 10,
    },
    cardContent: {
        gap: 2,
    },
    cardSubtitle: {
        color: theme.colors.accentLight,
        fontSize: 10, // Reduced from 12
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    cardTitle: {
        color: theme.colors.white,
        fontSize: 20, // Reduced from 26
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: '700',
        fontSize: 12,
    },
});

export default Catalog;