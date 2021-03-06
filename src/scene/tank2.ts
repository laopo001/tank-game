/**
 * File: c:\Users\35327\Githubs\tank-game\src\scene\tank2.ts
 * Project: c:\Users\35327\Githubs\tank-game
 * Created Date: Sunday, March 3rd 2019, 9:38:28 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, March 20th 2019, 11:52:20 pm
 * Modified By:
 * -----
 * Copyright (c) 2019 liaodh
 */



import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, math, Texture, CubeTexture, Quat } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera, BloodStrip, PlayerScript } from '../scripts';
import { json } from './physics-data';
import { AssetsLoader } from '../utils/assets';
import { AmmoPlugin } from 'hypergl/lib/plugins/physics';
let app = Application.getApp<AppPlugin>().unwrap();

let debug = false;
export const scene = new Scene('tank').initialize(AmmoPlugin).then(main);
let container = document.getElementById('container')!;
let div = document.createElement('div');
div.innerText = 'W，A，S，D 方向键，Space开火，F切换第一人称，Q，E切换照相机';
container.appendChild(div);

async function main(scene: Scene) {
    const red = new StandardMaterial();
    red.diffuseColor = new Color(1, 0, 0);


    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            // castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, -45, 0)
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
        .setPosition(0, 8, 9)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
    scene.root.addChild(camera);

    let loader = await AssetsLoader.loadAssets({
        scene: app.plugins.gltf.createLoader('./assets/models/_Complete-Game.gltf').loadSenceRoot(),
        tank: app.plugins.gltf.createLoader('./assets/models/CompleteTank.gltf').loadSenceRoot(),
        model_bulled: app.plugins.gltf.createLoader('./assets/models/bullet.gltf').loadMesh(0)
    });
    let node = loader.get('scene');

    node.setLocalScale(0.11, 0.11, 0.11);
    scene.root.addChild(node);
    scene.root.resolveJSON(json.root, debug);
    scene.root.enabled = true;

    let node2 = loader.get('tank');
    // scene.root.addChild(node2);

    let camera2 = new Entity('camera2')
        .addComponent('camera', {
            type: 'perspective',
            perspective: {
                fov: 45,
                aspectRatio: app.canvas.width / app.canvas.height,
                near: 1,
                far: 10000
            }
        })
        .setLocalPosition(0, 10, 0)
        .lookAt(new Vec3(0, 0, 0));

    let tank = new Entity('tank');
    tank.addComponent('collision', {
        type: 'box',
        debugger: debug,
        center: new Vec3(0, 0.25, 0),
        halfExtents: new Vec3(0.25, 0.25, 0.25),
    }).addComponent('rigidbody', {
        type: 'dynamic',
        mass: 0.1,
    }).addComponent('script', [
        new BloodStrip({ value: 50, camera }),
        new PlayerScript({ speed: 1, model: loader.get('model_bulled'), op: true })
    ]);
    tank.setPosition(0, 2, 0).setLocalScale(0.25, 0.25, 0.25);
    tank.addChild(node2);
    tank.findByTag('model').forEach(x => {
        x.model.instance.meshs.forEach(drawable => {
            drawable.castShadow = true;
        });
    });
    scene.root.addChild(camera2);
    scene.root.addChild(tank);

    function createEnemy() {
        let tank = new Entity('tank-enemy');
        tank.addComponent('collision', {
            type: 'box',
            debugger: debug,
            center: new Vec3(0, 0.25, 0),
            halfExtents: new Vec3(0.25, 0.25, 0.25),
        }).addComponent('rigidbody', {
            type: 'dynamic',
            mass: 0.1,
        }).addComponent('script', [
            new BloodStrip({ value: 50, camera }),
            new PlayerScript({ speed: 1, model: loader.get('model_bulled'), op: false })
        ]);
        tank.setPosition(math.random(-2, 2), 2, math.random(-2, 2)).setLocalScale(0.25, 0.25, 0.25);
        tank.addChild(node2.clone());
        tank.findByTag('model').forEach(x => {
            x.model.instance.meshs.forEach(drawable => {
                drawable.castShadow = true;
            });
        });
        scene.root.addChild(tank);
    }
    createEnemy();
    createEnemy();
    createEnemy();

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            receiveShadow: true
        })
        .addComponent('collision', {
            type: 'box',
            debugger: debug,
            halfExtents: new Vec3(5, 1, 5),
            center: new Vec3(0, -0.5, 0)
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(0, -0.1, 0).setLocalScale(10, 1, 10);
    scene.root.addChild(plane);


    scene.root.addChild(new Entity()
        .addComponent('collision', {
            type: 'box',
            debugger: debug,
            halfExtents: new Vec3(1, 5, 5),
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(5, 0, 0).setLocalScale(10, 1, 10));
    scene.root.addChild(new Entity()
        .addComponent('collision', {
            type: 'box',
            debugger: debug,
            halfExtents: new Vec3(1, 5, 5),
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(-5, 0, 0).setLocalScale(10, 1, 10));
    scene.root.addChild(new Entity()
        .addComponent('collision', {
            type: 'box',
            debugger: debug,
            halfExtents: new Vec3(5, 5, 1),
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(0, 0, 5).setLocalScale(10, 1, 10));
    scene.root.addChild(new Entity()
        .addComponent('collision', {
            type: 'box',
            debugger: debug,
            halfExtents: new Vec3(5, 5, 1),
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(0, 0, -5).setLocalScale(10, 1, 10));

    document.getElementById('canvas')!.addEventListener('mousedown', async (e) => {
        let from = camera.camera.screenToWorld(e.offsetX, e.offsetY, camera.camera.instance.nearClip);
        let to = camera.camera.screenToWorld(e.offsetX, e.offsetY, camera.camera.instance.farClip);

        let result = app.scene.systems.rigidbody!.physics.raycastFirst(from, to);
        if (result) {
            let pickedEntity = result.entity;
            console.log(pickedEntity.name);
        }

    }, false);
    return scene;
}
