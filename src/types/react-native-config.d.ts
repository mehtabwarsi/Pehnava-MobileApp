declare module 'react-native-config' {
    export interface NativeConfig {
        API_URL?: string;
        APP_NAME?: string;
        ENABLE_LOGS?: string;
    }

    export const Config: NativeConfig
    export default Config
}