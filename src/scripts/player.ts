/**
 * File: /Users/ldh/Projects/tank-game/src/scripts/player.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Wednesday, March 13th 2019, 10:52:48 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 17th 2019, 2:26:59 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */

import { math, Script, Vec3, Model, Entity } from 'hypergl';
import { AppPlugin } from '../types';

let id = 0;
export interface PlayerScriptInputs {
    speed: number;
    model: Model
}
export class PlayerScript extends Script<PlayerScriptInputs, AppPlugin> {
    static defaultInputs = {
        speed: 1,
    };
    ey!: number;

    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ey = eulers.y;
    }
    update(dt) {
        let d = 0.1;
        if (this.app.plugins.key.KeyW) {
            this.entity.translateLocal(0, 0, this.inputs.speed * dt);
            this.check();
            // let position = new Vec3();
            // this.entity.rigidbody.applyForce(this.entity.forward, position)
        } else if (this.app.plugins.key.KeyS) {
            this.entity.translateLocal(0, 0, -this.inputs.speed * dt);
            this.check();
            // let position = new Vec3();
            // this.entity.rigidbody.applyForce(this.entity.forward.scale(-1), position)
        }

        if (this.app.plugins.key.KeyA) {
            this.entity.setLocalEulerAngles(0, this.ey += 2, 0);
            this.check();
        } else if (this.app.plugins.key.KeyD) {
            this.entity.setLocalEulerAngles(0, this.ey -= 2, 0);
            this.check();
        }

        if (this.app.plugins.key.isPressed('Space')) {
            let bullet = new Entity({ tag: ['bullet'] }).addComponent('model', {
                type: 'model',
                // material: red,
                model: this.inputs.model
            }).addComponent('collision', {
                type: 'box',
                // debugger: true,
                halfExtents: new Vec3(0.1, 0.1, 0.1)
            }).addComponent('rigidbody', {
                type: 'dynamic',
                mass: 0.1
            }).setPosition(this.entity.getPosition())

            this.entity.scene.root.addChild(bullet);
            console.log(bullet);

            bullet.rigidbody.applyImpulse(this.entity.forward);
        }
        if (this.app.plugins.key.isPressed('KeyQ')) {
            this.entity.scene.setActiveCamera(2);
        }
        if (this.app.plugins.key.isPressed('KeyE')) {
            this.entity.scene.setActiveCamera(0);
        }
    }
    check() {
        if (0 === 0) {
            let physics = this.entity.scene.systems.rigidbody!.physics;
            physics.syncEntityToBody(this.entity, this.entity.rigidbody.body);
        }
    }
    // tslint:disable-next-line:no-empty
    destroy() { }
}