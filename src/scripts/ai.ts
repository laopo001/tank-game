/**
 * File: /Users/ldh/Projects/tank-game/src/scripts/ai.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Monday, March 18th 2019, 8:27:28 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, March 18th 2019, 8:34:30 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */

import { math, Script, Vec3, Model, Entity } from 'hypergl';
import { AppPlugin } from '../types';

export interface AITankScriptInputs {
    tank: Entity;
    speed: number;
}
export class AITankScript extends Script<AITankScriptInputs, AppPlugin> {
    static defaultInputs = {
        speed: 1,
    };

    initialize() {

    }
    update(dt) {
        if (this.entity.getPosition().sub(this.inputs.tank.getPosition()).length() < 5) {
            this.entity.lookAt(this.inputs.tank);
            this.entity.translateLocal(0, 0, this.inputs.speed * dt);
        }
    }
    destroy() { }
}
