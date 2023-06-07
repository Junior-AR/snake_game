export enum PlayerKeys {
    LEFT,
    RIGHT,
    UP,
    DOWN,
}

export interface KeyboardMap {
    [key: string]: PlayerKeys;
}

// Players keys controller

export const player1Controllers: KeyboardMap = {
    ArrowLeft: PlayerKeys.LEFT,
    ArrowRight: PlayerKeys.RIGHT,
    ArrowUp: PlayerKeys.UP,
    ArrowDown: PlayerKeys.DOWN,
};

export const player2Controllers: KeyboardMap = {
    a: PlayerKeys.LEFT,
    d: PlayerKeys.RIGHT,
    w: PlayerKeys.UP,
    s: PlayerKeys.DOWN,
};
