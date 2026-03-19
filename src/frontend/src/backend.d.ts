import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Post {
    title: string;
    content: string;
    zone: Zone;
    author: string;
    timestamp: Time;
}
export enum Zone {
    soundscape = "soundscape",
    artistic = "artistic",
    devden = "devden"
}
export interface backendInterface {
    addPost(title: string, content: string, zone: Zone, author: string): Promise<void>;
    getAllPosts(): Promise<Array<Post>>;
}
