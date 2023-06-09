import { PointInterface } from "../interfaces/point";

export const distance = (obj1: PointInterface, obj2: PointInterface) => {
    return Math.sqrt(
        Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2)
    );
};
