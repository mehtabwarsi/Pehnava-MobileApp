import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../../theme/theme'
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/Header/Header'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Navigation/types'

const SizeGuide = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [activeCategory, setActiveCategory] = useState<'men' | 'women'>('men')

    const mensSizeChart = [
        { size: 'S', chest: '36-38', waist: '28-30', hip: '36-38' },
        { size: 'M', chest: '38-40', waist: '30-32', hip: '38-40' },
        { size: 'L', chest: '40-42', waist: '32-34', hip: '40-42' },
        { size: 'XL', chest: '42-44', waist: '34-36', hip: '42-44' },
        { size: 'XXL', chest: '44-46', waist: '36-38', hip: '44-46' },
    ]

    const womensSizeChart = [
        { size: 'XS', bust: '30-32', waist: '24-26', hip: '32-34' },
        { size: 'S', bust: '32-34', waist: '26-28', hip: '34-36' },
        { size: 'M', bust: '34-36', waist: '28-30', hip: '36-38' },
        { size: 'L', bust: '36-38', waist: '30-32', hip: '38-40' },
        { size: 'XL', bust: '38-40', waist: '32-34', hip: '40-42' },
        { size: 'XXL', bust: '40-42', waist: '34-36', hip: '42-44' },
    ]

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <Header
                    title='Size Guide'
                    showWishlist
                    showCart
                    onPressBack={() => navigation.pop()}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Category Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeCategory === 'men' && styles.activeTab]}
                            onPress={() => setActiveCategory('men')}
                        >
                            <Text style={[styles.tabText, activeCategory === 'men' && styles.activeTabText]}>
                                Men's Wear
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeCategory === 'women' && styles.activeTab]}
                            onPress={() => setActiveCategory('women')}
                        >
                            <Text style={[styles.tabText, activeCategory === 'women' && styles.activeTabText]}>
                                Women's Wear
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Size Chart */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.sectionTitle}>
                            {activeCategory === 'men' ? "Men's" : "Women's"} Size Chart (in inches)
                        </Text>

                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeader, styles.sizeColumn]}>Size</Text>
                            <Text style={styles.tableHeader}>
                                {activeCategory === 'men' ? 'Chest' : 'Bust'}
                            </Text>
                            <Text style={styles.tableHeader}>Waist</Text>
                            <Text style={styles.tableHeader}>Hip</Text>
                        </View>

                        {/* Table Rows */}
                        {activeCategory === 'men'
                            ? mensSizeChart.map((item, index) => (
                                <View
                                    key={item.size}
                                    style={[
                                        styles.tableRow,
                                        index % 2 === 0 && styles.alternateRow,
                                    ]}
                                >
                                    <Text style={[styles.tableCell, styles.sizeColumn, styles.sizeText]}>
                                        {item.size}
                                    </Text>
                                    <Text style={styles.tableCell}>{item.chest}</Text>
                                    <Text style={styles.tableCell}>{item.waist}</Text>
                                    <Text style={styles.tableCell}>{item.hip}</Text>
                                </View>
                            ))
                            : womensSizeChart.map((item, index) => (
                                <View
                                    key={item.size}
                                    style={[
                                        styles.tableRow,
                                        index % 2 === 0 && styles.alternateRow,
                                    ]}
                                >
                                    <Text style={[styles.tableCell, styles.sizeColumn, styles.sizeText]}>
                                        {item.size}
                                    </Text>
                                    <Text style={styles.tableCell}>{item.bust}</Text>
                                    <Text style={styles.tableCell}>{item.waist}</Text>
                                    <Text style={styles.tableCell}>{item.hip}</Text>
                                </View>
                            ))}
                    </View>

                    {/* How to Measure */}
                    <View style={styles.measureSection}>
                        <Text style={styles.sectionTitle}>How to Measure</Text>

                        <View style={styles.measureItem}>
                            <View style={styles.iconCircle}>
                                <Icon name="body-outline" size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.measureContent}>
                                <Text style={styles.measureTitle}>
                                    {activeCategory === 'men' ? 'Chest' : 'Bust'}
                                </Text>
                                <Text style={styles.measureText}>
                                    Measure around the fullest part of your {activeCategory === 'men' ? 'chest' : 'bust'}, keeping the tape horizontal.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.measureItem}>
                            <View style={styles.iconCircle}>
                                <Icon name="ellipse-outline" size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.measureContent}>
                                <Text style={styles.measureTitle}>Waist</Text>
                                <Text style={styles.measureText}>
                                    Measure around the narrowest part of your waistline, keeping the tape comfortably loose.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.measureItem}>
                            <View style={styles.iconCircle}>
                                <Icon name="resize-outline" size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.measureContent}>
                                <Text style={styles.measureTitle}>Hip</Text>
                                <Text style={styles.measureText}>
                                    Stand with feet together and measure around the fullest part of your hips.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Tips */}
                    <View style={styles.tipsSection}>
                        <View style={styles.tipCard}>
                            <Icon name="bulb-outline" size={24} color={theme.colors.accent} />
                            <View style={styles.tipContent}>
                                <Text style={styles.tipTitle}>Pro Tip</Text>
                                <Text style={styles.tipText}>
                                    For the most accurate measurement, ask someone to help you measure while you stand straight.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.tipCard}>
                            <Icon name="checkmark-circle-outline" size={24} color={theme.colors.secondary} />
                            <View style={styles.tipContent}>
                                <Text style={styles.tipTitle}>Between Sizes?</Text>
                                <Text style={styles.tipText}>
                                    If you're between sizes, we recommend choosing the larger size for a comfortable fit.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default SizeGuide

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
    },
    activeTab: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.charcoal,
    },
    activeTabText: {
        color: '#fff',
    },
    chartContainer: {
        margin: 16,
        marginTop: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    alternateRow: {
        backgroundColor: '#F9FAFB',
    },
    tableHeader: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.charcoal,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tableCell: {
        flex: 1,
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.darkSlate,
        textAlign: 'center',
    },
    sizeColumn: {
        flex: 0.6,
    },
    sizeText: {
        fontWeight: '700',
        color: theme.colors.primary,
    },
    measureSection: {
        margin: 16,
        marginTop: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    measureItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    measureContent: {
        flex: 1,
    },
    measureTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 4,
    },
    measureText: {
        fontSize: 13,
        fontWeight: '400',
        color: theme.colors.darkSlate,
        lineHeight: 18,
    },
    tipsSection: {
        margin: 16,
        marginTop: 0,
        gap: 12,
        paddingBottom: 20,
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tipContent: {
        flex: 1,
        marginLeft: 12,
    },
    tipTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 4,
    },
    tipText: {
        fontSize: 13,
        fontWeight: '400',
        color: theme.colors.darkSlate,
        lineHeight: 18,
    },
})