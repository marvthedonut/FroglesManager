export interface Event {
    id: string;
    type: string;
    once(...args: any[]): void;
}
