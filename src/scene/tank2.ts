/**
 * File: c:\Users\35327\Githubs\tank-game\src\scene\tank2.ts
 * Project: c:\Users\35327\Githubs\tank-game
 * Created Date: Sunday, March 3rd 2019, 9:38:28 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 12:24:59 am
 * Modified By:
 * -----
 * Copyright (c) 2019 liaodh
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, Quat } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera, BloodStrip } from '../scripts'

let app = Application.getApp<AppPlugin>().unwrap();

const scene = new Scene('tank');

async function main() {
    // let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
    //     'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
    const red = new StandardMaterial();
    red.diffuseColor = new Color(1, 0, 0);

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
            receiveShadow: true
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

    let gltf = app.plugins.gltf.createLoader('./assets/models/CompleteLevelArt.gltf');
    gltf.loadSenceRoot().then(node => {
        let entity = new Entity('tank');
        entity.addComponent('collision', {
            type: 'box',
            halfExtents: new Vec3(1, 1, 1),
        }).addComponent('rigidbody', {
            type: 'dynamic',
            mass: 1
        }).addComponent('script', [new BloodStrip({ value: 50, camera })]);
        entity.addChild(node);
        node.setLocalPosition(0, -1, 0);
        entity.findByTag('model').forEach(x => {
            x.model.instance.meshs.forEach(drawable => {
                drawable.castShadow = true;
            });
        });
        scene.root.addChild(entity);
    });
    scene.event.on('active', () => {
        let picker = new Picker(scene);
        document.getElementById('canvas')!.addEventListener('mousedown', async (e) => {
            if (app.scene.name === 'tank') {
                let entity = picker.pick(e.offsetX, e.offsetY);
                console.log(entity.name);
            }
        }, false);
    });

}
main();

export { scene };
