/**
 * ProjectName: tank-game
 * FilePath: \src\types.ts
 * Created Date: Thursday, February 28th 2019, 10:53:21 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 3rd 2019, 9:40:15 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */


import { GltfPlugin } from 'hypergl/lib/plugins/load';
import { PointerPlugin } from 'hypergl/lib/plugins/pointer';
import { AmmoPlugin } from 'hypergl/lib/plugins/physics';
import { KeyPlugin } from 'hypergl/lib/plugins/key';
export interface AppPlugin {
    pointer: PointerPlugin,
    gltf: GltfPlugin,
    physics: AmmoPlugin,
    key: KeyPlugin
}