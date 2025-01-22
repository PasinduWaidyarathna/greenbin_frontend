export interface RecycleItemType {
    id: string;
    name: string;
    icon: string;
}

export const recycleItems: RecycleItemType[] = [
    { id: 'paper', name: 'Paper', icon: 'newspaper' },
    { id: 'plastic', name: 'Plastic', icon: 'bottle-soda' },
    { id: 'metal', name: 'Metal', icon: 'recycle' },
    { id: 'clothes', name: 'Clothes', icon: 'tshirt-crew' },
    { id: 'ewaste', name: 'E waste', icon: 'laptop' },
    { id: 'glass', name: 'Glass', icon: 'bottle-wine' },
];

