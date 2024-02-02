import { Billboard } from "@prisma/client";

export interface billboard {
    id: string;
    name: string;
    imageUrl: string;
};
export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}