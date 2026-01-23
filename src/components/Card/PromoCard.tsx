import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../../theme/theme'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

interface PromoCardProps {
    offPrice: string
    description: string;
    code: string;
    onPress?: () => void
}

const PromoCard: React.FC<PromoCardProps> = ({ offPrice, description, code, onPress }) => {
    return (
        <TouchableOpacity style={styles.promoStrip} activeOpacity={0.9} onPress={onPress}>
            <LinearGradient
                colors={[theme.colors.charcoal, '#2C3E50']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.promoGradient}
            >
                <View style={styles.promoContent}>
                    <View style={styles.promoIconTag}>
                        <Icon name="flash" size={12} color={theme.colors.white} />
                    </View>
                    <Text style={styles.promoText}>
                        FLAT <Text style={styles.promoBold}>{offPrice}</Text> {description}
                    </Text>
                    <Text style={styles.promoCode}>{code}</Text>
                </View>
                <Icon name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.3)" />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default PromoCard

const styles = StyleSheet.create({
    promoStrip: {
        marginHorizontal: 20,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    promoGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    promoIconTag: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoContent: {
        flex: 1,
    },
    promoText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    promoBold: {
        color: theme.colors.white,
        fontWeight: '900',
        fontSize: 12,
    },
    promoCode: {
        color: theme.colors.white,
        fontSize: 13,
        fontWeight: '800',
        marginTop: 2,
        letterSpacing: 1,
    },
})