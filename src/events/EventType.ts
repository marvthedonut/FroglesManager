export default interface EventType {
	id: string;
	type: string;
	once(...args: any[]): void;
}
