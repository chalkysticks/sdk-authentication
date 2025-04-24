declare module '@capacitor/browser' {
	/**
	 * Browser API for opening URLs in a browser-like view.
	 */
	export interface OpenOptions {
		presentationStyle?: 'fullscreen' | 'popover';
		url: string;
		windowName?: string;
	}

	export interface BrowserPlugin {
		close(): Promise<void>;
		open(options: OpenOptions): Promise<void>;
	}

	export const Browser: BrowserPlugin;
}

declare module '@capacitor/core' {
	export interface PluginListenerHandle {
		remove: () => Promise<void>;
	}

	export interface CapacitorInstance {
		convertFileSrc(filePath: string): string;
		getPlatform(): 'ios' | 'android' | 'web';
		isNativePlatform(): boolean;
	}

	export interface Plugins {
		[key: string]: any;
	}

	export const Capacitor: CapacitorInstance;
	export const Plugins: Plugins;
}
