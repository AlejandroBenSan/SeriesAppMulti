import { ObjectId } from "mongoose";

export interface SerieI{
    _id: string | ObjectId;
    title: string;
    categories: string[];
    chapters: number;
    year: number;
    synopsis: string;
    scoring: number;
    image: string[];
    numberImages: number;
    numberCategories: number;
    categoriaAbierta : boolean;
}