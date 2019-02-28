/**
 * ProjectName: tank-game
 * FilePath: \src\scene\tank.ts
 * Created Date: Thursday, February 28th 2019, 2:02:23 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, February 28th 2019, 2:09:52 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 jiguang
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';


let app = Application.getApp<AppPlugin>().unwrap();

const scene = new Scene('tank');

let gltf = app.plugins.gltf.createLoader('./assets/models/CompleteTank.gltf');

// let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
//     'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');

gltf.loadSenceRoot().then(node => {
    // node.setLocalScale(0.11, 0.11, 0.11);
    scene.root.addChild(node);
});

let light = new Entity('light')
    .addComponent('light', {
        type: 'directional',
        castShadows: true,
        shadowType: 'PCF',
        range: 16
    })
    .setEulerAngles(-45, 0, 0)
    .setLocalPosition(0, 5, 0);
scene.root.addChild(light);


let camera = new Entity('camera')
    .addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 45,
            aspectRatio: app.canvas.width / app.canvas.height,
            near: 1,
            far: 10000
        }
    })
    .setPosition(0, 5, 5)
    .lookAt(new Vec3(0, 0, 0))
scene.root.addChild(camera);

export { scene };
