import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { theme } from '../../theme/theme'

interface TrendingCardProps {
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    onPress?: () => void;
}

const TrendingCard = ({ title, subtitle, image, buttonText, onPress }: TrendingCardProps) => {
    return (
        <TouchableOpacity style={styles.dualBannerBox} activeOpacity={0.9} onPress={onPress}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.dualBannerImg}
                imageStyle={styles.roundedImg}
            >
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.dualGradient}>
                    <Text style={styles.dualTag}>{subtitle}</Text>
                    <Text style={styles.dualTitle}>{title}</Text>
                    <Text style={styles.dualAction}>{buttonText}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default TrendingCard

const styles = StyleSheet.create({
    dualBanners: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginTop: 24,
    },
    dualBannerBox: {
        flex: 1,
        height: 200,
    },
    dualBannerImg: {
        flex: 1,
    },
    roundedImg: {
        borderRadius: 12,
    },
    dualGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 12,
        borderRadius: 12,
    },
    dualTag: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dualTitle: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8,
    },
    dualAction: {
        color: theme.colors.white,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
        textDecorationLine: 'underline',
    },
})