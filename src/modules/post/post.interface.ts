import { Document } from "mongodb";

export default interface Post extends Document {
    title: string;
    content: string;
    author: string;
}

