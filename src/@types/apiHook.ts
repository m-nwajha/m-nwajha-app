import type { FAILURE, INIT, SUCCESS } from '@/constants/actionTypeAPI';

export type State<T= any> = {
    isLoading: boolean;
    isError: boolean;
    data: T | null;
    error?: unknown;
};

export type Action<T = any> =
    | { type: typeof INIT; }
    | { type: typeof SUCCESS; payload: T; }
    | { type: typeof FAILURE; payload: unknown; };
