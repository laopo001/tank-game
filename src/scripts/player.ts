/**
 * File: /Users/ldh/Projects/tank-game/src/scripts/player.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Wednesday, March 13th 2019, 10:52:48 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 16th 2019, 1:43:53 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */

import { math, Script, Vec3 } from 'hypergl';
import { AppPlugin } from '../types';

let id = 0;
export interface PlayerScriptInputs {
    speed: number;
}
export class PlayerScript extends Script<PlayerScriptInputs, AppPlugin> {
    static defaultInputs = {
        speed: 1
    };
    ey!: number;
    forwards = false;
    backwards = false;
    left = false;
    right = false;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ey = eulers.y;
        // tslint:disable-next-line:one-variable-per-declaration


        document.addEventListener('keydown', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (event.key === 'w') {
                this.forwards = true;
            }
            if (event.key === 's') {
                this.backwards = true;
            }
            if (event.key === 'a') {
                this.left = true;
            }
            if (event.key === 'd') {
                this.right = true;
            }
            if (event.key === 'q') {
                this.entity.scene.setActiveCamera(2);
            }
            if (event.key === 'e') {
                this.entity.scene.setActiveCamera(0);
            }
        }, false);
        document.addEventListener('keyup', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (event.key === 'w') {
                this.forwards = false;
            }
            if (event.key === 's') {
                this.backwards = false;
            }
            if (event.key === 'a') {
                this.left = false;
            }
            if (event.key === 'd') {
                this.right = false;
            }

        }, false);
    }
    update(dt) {
        let d = 0.05;
        if (this.forwards) {
            // this.entity.translateLocal(0, 0, this.inputs.speed * dt);
            // this.check();
            let position = new Vec3();
            if (this.left) {
                position.set(d, 0, 0);
            }
            if (this.right) {
                position.set(-d, 0, 0);
            }
            this.entity.rigidbody.applyForce(this.entity.forward, position)
        } else if (this.backwards) {
            let position = new Vec3();
            if (this.left) {
                position.set(d, 0, 0);
            }
            if (this.right) {
                position.set(-d, 0, 0);
            }
            this.entity.rigidbody.applyForce(this.entity.forward.scale(-1), position)

        }

        if (this.left) {
            this.entity.setLocalEulerAngles(0, this.ey += 2, 0);
            this.check();
        } else if (this.right) {
            this.entity.setLocalEulerAngles(0, this.ey -= 2, 0);
            this.check();
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