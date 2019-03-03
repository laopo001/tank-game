/**
 * ProjectName: tank-game
 * FilePath: \src\index.ts
 * Created Date: Thursday, February 28th 2019, 10:40:19 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 3rd 2019, 9:40:15 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */


import { Application } from 'hypergl';
import { AppPlugin } from './types';
import { GltfPlugin } from 'hypergl/lib/plugins/load';
import { PointerPlugin } from 'hypergl/lib/plugins/pointer';
import { AmmoPlugin } from 'hypergl/lib/plugins/physics';
import { StatsPlugin } from 'hypergl/lib/plugins/stat';
import { KeyPlugin } from 'hypergl/lib/plugins/key';

const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement);
console.log(app);

app.registerPlugins([StatsPlugin, PointerPlugin, AmmoPlugin, GltfPlugin, KeyPlugin]);

import('./scene/tank').then(module => {
    if (!module.scene.isRegistered) {
        app.addScene(module.scene);
    }
    app.setActiveScene('tank')
    app.start();
});