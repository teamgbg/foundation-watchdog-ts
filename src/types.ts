/**
 * @system watchdog
 * @status handwritten
 */

export interface WatchdogResult {
	healthy: boolean;
	details?: Record<string, unknown>;
}

export interface WatchdogOptions {
	intervalMs: number;
	check: () => Promise<WatchdogResult>;
	onDegraded?: (result: WatchdogResult) => void | Promise<void>;
	onRecovered?: (result: WatchdogResult) => void | Promise<void>;
	runOnStart?: boolean;
}

export interface WatchdogStatus {
	name: string;
	running: boolean;
	intervalMs: number;
	lastResult: WatchdogResult | null;
	lastRunAt: string | null;
	consecutiveFailures: number;
	enabled: boolean;
}

export interface WatchdogHandle {
	start(): void;
	stop(): void;
	runOnce(): Promise<WatchdogResult>;
	readonly status: WatchdogStatus;
	readonly name: string;
}

export interface WatchdogConfig {
	overrides?: Record<string, { enabled?: boolean; intervalMs?: number }>;
}
