import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme/theme';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

type CollectionCardProps = {
    title: string;
    subtitle: string;
    image: string;
    isLarge?: boolean;
    onPress?: () => void;
};

const CollectionCard = ({ title, subtitle, image, isLarge = false, onPress }: CollectionCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, isLarge ? styles.largeContainer : styles.smallContainer]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {/* Image */}
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Cinematic Gradient Overlay */}
            <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                style={styles.overlay}
            />

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.tagWrapper}>
                    <Text style={styles.tagText}>BOUTIQUE EDIT</Text>
                </View>

                <Text style={[styles.title, isLarge ? styles.largeTitle : styles.smallTitle]} numberOfLines={2}>
                    {title}
                </Text>

                {isLarge && (
                    <Text style={styles.subtitle} numberOfLines={2}>
                        {subtitle}
                    </Text>
                )}

                <View style={styles.actionRow}>
                    <Text style={styles.actionText}>VIEW COLLECTION</Text>
                    <Icon name="arrow-right" size={14} color={theme.colors.white} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: theme.colors.lightGray,
    },
    largeContainer: {
        height: 420,
    },
    smallContainer: {
        height: 280,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFill,
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    tagWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 8,
    },
    tagText: {
        color: theme.colors.white,
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 2,
    },
    title: {
        fontWeight: '800',
        color: theme.colors.white,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    largeTitle: {
        fontSize: 28,
        lineHeight: 34,
    },
    smallTitle: {
        fontSize: 20,
        lineHeight: 26,
    },
    subtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: 20,
        fontWeight: '500',
        lineHeight: 18,
        maxWidth: '90%',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionText: {
        color: theme.colors.white,
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
    }
});

export default CollectionCard;
