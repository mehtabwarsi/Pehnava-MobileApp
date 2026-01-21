import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme/theme';
import { RootStackParamList } from '../../Navigation/types';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock Data
const CART_MOCK = [
    {
        id: '1',
        brand: 'PEHNAVA BOUTIQUE',
        product: {
            id: 'p1',
            name: 'Imperial Banarasi Silk Saree',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
        },
        variant: {
            size: 'Free Size',
            colorName: 'Royal Maroon',
            color: '#8B0000',
            price: 6500,
            discountPrice: 4850,
            stock: 5
        },
        quantity: 1
    },
    {
        id: '2',
        brand: 'PEHNAVA TRENDS',
        product: {
            id: 'p2',
            name: 'Midnight Bloom Kurta Set',
            image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b'
        },
        variant: {
            size: 'M',
            colorName: 'Navy Blue',
            color: '#000080',
            price: 3200,
            discountPrice: 2100,
            stock: 12
        },
        quantity: 2
    }
];

const QuantityModal = ({
    visible,
    onClose,
    currentQuantity,
    maxStock,
    onSelect
}: {
    visible: boolean;
    onClose: () => void;
    currentQuantity: number;
    maxStock: number;
    onSelect: (qty: number) => void;
}) => {
    const quantities = Array.from({ length: Math.min(maxStock, 10) }, (_, i) => i + 1);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.modalContent}>
                    <View style={styles.modalIndicator} />
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Quantity</Text>
                        <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                            <Icon name="x" size={20} color={theme.colors.slate} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.quantityGrid}>
                        {quantities.map((qty) => (
                            <TouchableOpacity
                                key={qty}
                                style={[styles.quantityBadge, qty === currentQuantity && styles.activeQuantityBadge]}
                                onPress={() => onSelect(qty)}
                            >
                                <Text style={[styles.quantityText, qty === currentQuantity && styles.activeQuantityText]}>
                                    {qty}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const CartScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [items, setItems] = useState(CART_MOCK);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const mrpTotal = items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
    const discountTotal = items.reduce((sum, item) => sum + ((item.variant.price - item.variant.discountPrice) * item.quantity), 0);
    const finalAmount = mrpTotal - discountTotal;

    const handleUpdateQuantity = (id: string, newQty: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
        setActiveItemId(null);
    };

    const handleRemoveItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.emptyContent}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329073.png' }}
                        style={styles.emptyImage}
                    />
                    <Text style={styles.emptyTitle}>Your bag is empty!</Text>
                    <Text style={styles.emptySubtitle}>Add some boutique treasures to your bag and bring them home.</Text>
                    <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('HomeTab' as never)}>
                        <Text style={styles.shopButtonText}>DISCOVER COLLECTIONS</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Professional App Header */}
            <View style={styles.appHeader}>
                <View style={styles.headerTitleRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Icon name="arrow-left" size={24} color={theme.colors.charcoal} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleMain}>SHOPPING BAG</Text>
                        <Text style={styles.headerSubtitleMain}>{items.length} ITEMS • ₹{finalAmount.toLocaleString('en-IN')}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.wishlistBtn} onPress={() => navigation.navigate('WishList')}>
                    <Icon name="heart" size={22} color={theme.colors.charcoal} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Items List */}
                <View style={styles.section}>
                    {items.map((item) => (
                        <View key={item.id} style={styles.cartCard}>
                            <View style={styles.cardMain}>
                                {/* Image Section */}
                                <View style={styles.cardImageContainer}>
                                    <Image source={{ uri: item.product.image }} style={styles.cardImage} />
                                </View>

                                {/* Info Section */}
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardBrand}>{item.brand}</Text>
                                    <Text style={styles.cardProductName} numberOfLines={1}>{item.product.name}</Text>

                                    <View style={styles.variantSelectorRow}>
                                        <View style={styles.pillSelector}>
                                            <Text style={styles.pillText}>Size: {item.variant.size}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.pillSelector}
                                            onPress={() => setActiveItemId(item.id)}
                                        >
                                            <Text style={styles.pillText}>Qty: {item.quantity}</Text>
                                            <Icon name="chevron-down" size={12} color={theme.colors.charcoal} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.priceRow}>
                                        <Text style={styles.sellingPrice}>₹{item.variant.discountPrice.toLocaleString('en-IN')}</Text>
                                        <Text style={styles.mrpPrice}>₹{item.variant.price.toLocaleString('en-IN')}</Text>
                                        <Text style={styles.discountPercent}>
                                            ({Math.round(((item.variant.price - item.variant.discountPrice) / item.variant.price) * 100)}% OFF)
                                        </Text>
                                    </View>

                                    <View style={styles.deliveryInfo}>
                                        <Icon name="truck" size={12} color={theme.colors.slate} />
                                        <Text style={styles.deliveryText}>Delivery by <Text style={styles.boldText}>Tomorrow</Text></Text>
                                    </View>
                                </View>
                            </View>

                            {/* Action Row */}
                            <View style={styles.cardActions}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleRemoveItem(item.id)}>
                                    <Icon name="trash-2" size={16} color={theme.colors.charcoal} />
                                    <Text style={styles.actionBtnText}>REMOVE</Text>
                                </TouchableOpacity>
                                <View style={styles.actionDivider} />
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Icon name="heart" size={16} color={theme.colors.charcoal} />
                                    <Text style={styles.actionBtnText}>WISHLIST</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Coupon Section */}
                <TouchableOpacity style={styles.couponSection}>
                    <View style={styles.couponLabel}>
                        <Icon name="tag" size={18} color={theme.colors.charcoal} />
                        <Text style={styles.couponText}>Apply Coupon / Offers</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={theme.colors.slate} />
                </TouchableOpacity>

                {/* Bill Details */}
                <View style={styles.billSection}>
                    <Text style={styles.sectionTitle}>BILL DETAILS</Text>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Bag Total</Text>
                        <Text style={styles.billValueMain}>₹{mrpTotal.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Boutique Discount</Text>
                        <Text style={styles.billValueDiscount}>- ₹{discountTotal.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Shipping Fee</Text>
                        <Text style={styles.billValueFree}>FREE</Text>
                    </View>
                    <View style={styles.billDivider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>₹{finalAmount.toLocaleString('en-IN')}</Text>
                    </View>
                </View>

                {/* Security Flags */}
                <View style={styles.securitySection}>
                    <View style={styles.securityFlag}>
                        <Icon name="shield" size={14} color={theme.colors.slate} />
                        <Text style={styles.securityText}>100% Genuine Products</Text>
                    </View>
                    <View style={styles.securityFlag}>
                        <Icon name="refresh-cw" size={14} color={theme.colors.slate} />
                        <Text style={styles.securityText}>Easy 15 Day Returns</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Premium Sticky Footer */}
            <View style={styles.footer}>
                <View style={styles.footerPriceCol}>
                    <Text style={styles.footerPrice}>₹{finalAmount.toLocaleString('en-IN')}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.footerPriceDetail}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.proceedBtn}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.proceedBtnText}>PLACE ORDER</Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.white} />
                </TouchableOpacity>
            </View>

            <QuantityModal
                visible={!!activeItemId}
                onClose={() => setActiveItemId(null)}
                currentQuantity={items.find(i => i.id === activeItemId)?.quantity || 1}
                maxStock={items.find(i => i.id === activeItemId)?.variant.stock || 0}
                onSelect={(qty) => activeItemId && handleUpdateQuantity(activeItemId, qty)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    appHeader: {
        height: 60,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitleMain: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
        letterSpacing: 0.5,
    },
    headerSubtitleMain: {
        fontSize: 11,
        color: theme.colors.slate,
        fontWeight: '500',
        marginTop: 2,
    },
    wishlistBtn: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    section: {
        padding: 12,
    },
    cartCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    cardMain: {
        flexDirection: 'row',
        padding: 12,
    },
    cardImageContainer: {
        width: SCREEN_WIDTH * 0.25,
        aspectRatio: 1 / 1.3,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardInfo: {
        flex: 1,
        marginLeft: 16,
    },
    cardBrand: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.slate,
        letterSpacing: 0.5,
    },
    cardProductName: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.charcoal,
        marginTop: 2,
    },
    variantSelectorRow: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 8,
    },
    pillSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    pillText: {
        fontSize: 11,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6,
    },
    sellingPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    mrpPrice: {
        fontSize: 12,
        color: theme.colors.slate,
        textDecorationLine: 'line-through',
    },
    discountPercent: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF3E6C',
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 10,
    },
    deliveryText: {
        fontSize: 11,
        color: theme.colors.slate,
    },
    boldText: {
        fontWeight: '700',
        color: '#282C3F',
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        height: 44,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    actionBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    actionDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#EEEEEE',
        alignSelf: 'center',
    },
    couponSection: {
        backgroundColor: theme.colors.white,
        marginHorizontal: 12,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    couponLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    couponText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    billSection: {
        backgroundColor: theme.colors.white,
        marginHorizontal: 12,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: theme.colors.slate,
        letterSpacing: 1,
        marginBottom: 16,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    billLabel: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '500',
    },
    billValueMain: {
        fontSize: 14,
        color: theme.colors.charcoal,
        fontWeight: '600',
    },
    billValueDiscount: {
        fontSize: 14,
        color: '#03A685',
        fontWeight: '600',
    },
    billValueFree: {
        fontSize: 14,
        color: '#03A685',
        fontWeight: '700',
    },
    billDivider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 4,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    securitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
        gap: 12,
    },
    securityFlag: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        gap: 6,
    },
    securityText: {
        fontSize: 9,
        fontWeight: '600',
        color: theme.colors.slate,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    footerPriceCol: {
        flex: 1,
    },
    footerPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    footerPriceDetail: {
        fontSize: 12,
        color: theme.colors.primary,
        fontWeight: '700',
        marginTop: 2,
    },
    proceedBtn: {
        flex: 1.5,
        backgroundColor: theme.colors.charcoal,
        height: 52,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    proceedBtnText: {
        color: theme.colors.white,
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: 1,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    emptyContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyImage: {
        width: 120,
        height: 120,
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: theme.colors.charcoal,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: theme.colors.slate,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    shopButton: {
        borderWidth: 1,
        borderColor: theme.colors.charcoal,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 4,
    },
    shopButtonText: {
        color: theme.colors.charcoal,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: SCREEN_HEIGHT * 0.6,
    },
    modalIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#DDDDDD',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    modalCloseBtn: {
        padding: 4,
    },
    quantityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingBottom: 20,
    },
    quantityBadge: {
        width: (SCREEN_WIDTH - 40 - 36) / 4,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeQuantityBadge: {
        backgroundColor: theme.colors.charcoal,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    activeQuantityText: {
        color: theme.colors.white,
    },
});

export default CartScreen;
