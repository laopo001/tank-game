/**
 * ProjectName: tank-game
 * FilePath: \src\scene\tank.ts
 * Created Date: Thursday, February 28th 2019, 2:02:23 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 1st 2019, 1:18:57 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 jiguang
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera, BloodStrip } from '../scripts'

let app = Application.getApp<AppPlugin>().unwrap();

const scene = new Scene('tank');

let gltf = app.plugins.gltf.createLoader('./assets/models/CompleteTank.gltf');

// let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
//     'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');


let light = new Entity('light')
    .addComponent('light', {
        type: 'directional',
        castShadows: true,
        shadowType: 'PCF',
        range: 16
    })
    .setEulerAngles(-45, -45, 0)
    .setLocalPosition(0, 5, 0);
scene.root.addChild(light);

let plane = new Entity('plane')
    .addComponent('model', {
        type: 'plane',
        // material: grassMaterial
    })
    .addComponent('collision', {
        type: 'box',
        // debugger: true,
        halfExtents: new Vec3(5, 0.1, 5),
    })
    .addComponent('rigidbody', {
        type: 'static',
        mass: 0
    })
    .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
scene.root.addChild(plane);


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
    .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
scene.root.addChild(camera);

gltf.loadSenceRoot().then(node => {
    let entity = new Entity('tank');
    entity.addComponent('collision', {
        type: 'box',
        // debugger: true,
        halfExtents: new Vec3(1, 1, 1),
    }).addComponent('rigidbody', {
        type: 'dynamic',
        mass: 1
    }).addComponent('script', [new BloodStrip({ value: 50, camera })]);
    entity.addChild(node);
    node.setLocalPosition(0, -1, 0);
    entity.findByTag('model').forEach(x => {

    });

    scene.root.addChild(entity);
});

document.getElementById('canvas')!.addEventListener('mousedown', (e) => {
    let from = camera.camera.screenToWorld(e.x, e.y, camera.camera.instance.nearClip);
    let to = camera.camera.screenToWorld(e.x, e.y, camera.camera.instance.farClip);
    let result = scene.systems.rigidbody!.physics.raycastFirst(from, to);
    if (result) {
        let pickedEntity = result.entity;
        console.log(pickedEntity.name);
    }
}, false);

export { scene };
