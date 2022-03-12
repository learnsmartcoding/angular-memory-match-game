export interface ImageDetail {
    id: number;
    imageId: number;
    imagePath: string;
    isVisible: boolean;
    matched:boolean;
    clickCount: number;
    category:string;
    cardBack:string;
    cardFront:string;
}