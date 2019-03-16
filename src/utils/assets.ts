/**
 * File: /Users/ldh/Projects/tank-game/src/utils/assets.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Wednesday, March 13th 2019, 8:44:16 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 16th 2019, 4:08:07 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */

type UnpackedPromise<T> = T extends Promise<infer U> ? U : never;

export class AssetsLoader<T> {
    private obj = {} as any;
    static async loadAssets<T extends { [s: string]: Promise<any> }>(obj: T) {
        let arr: Array<Promise<any>> = [];
        let map = {} as any;
        let i = 0;
        for (let x in obj) {
            arr.push(obj[x]);
            map[i++] = x;
        }
        let x = await Promise.all(arr);
        let loader = new AssetsLoader<T>();
        x.forEach((x, i) => {
            loader.set(map[i], x);
        })
        return loader;
    }
    private set(name: string, p: any) {
        this.obj[name] = p;
    }
    get<K extends keyof T>(name: K): UnpackedPromise<T[K]> {
        return this.obj[name];
    }
}
