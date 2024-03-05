export interface Message {
    text: string,
    isGtpt:boolean
    info?: {
        userScore: number;
        errors: string[];
        message: string;
    }
}