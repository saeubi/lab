declare namespace __WebpackModuleApi {
    interface RequireContext {
        <T>(id: string): T;
        keys(): string[];
        id: string;
    }
}