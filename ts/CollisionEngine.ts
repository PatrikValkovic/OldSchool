import {Collisionable} from "./ColliderEntities";
import _ = require("lodash");


export class CollisionEngine {
    private staticObjects: Collisionable<any>[] = [];
    private dynamicObjects: Collisionable<any>[] = [];
    private handlers = {};

    addStatic(...objects: Collisionable<any>[]) {
        this.staticObjects.push(..._.reject(
            objects, o => _.includes(this.staticObjects, o)
        ));
    }

    addDynamic(...objects: Collisionable<any>[]) {
        this.dynamicObjects.push(..._.reject(
            objects, o => _.includes(this.dynamicObjects, o)
        ));
    }

    removeStatic(...objects: Collisionable<any>[]) {
        this.staticObjects = _.reject(
            this.staticObjects,
            o => _.includes(objects, o)
        );
    }

    removeDynamic(...objects: Collisionable<any>[]) {
        this.dynamicObjects = _.reject(
            this.dynamicObjects,
            o => _.includes(objects, o)
        );
    }

    checkStaticOnly() {
        for (const f of this.staticObjects)
            for (const s of this.staticObjects)
                if (f !== s)
                    if (f.collide(s))
                        this.invoke(f, s);
    }

    checkDynamicOnly() {
        for (const f of this.dynamicObjects)
            for (const s of this.dynamicObjects)
                if (f !== s)
                    if (f.collide(s))
                        this.invoke(f, s);
    }

    checkDynamicStatic() {
        for (const f of this.dynamicObjects)
            for (const s of this.staticObjects)
                if (f.collide(s))
                    this.invoke(f, s);
    }

    checkAll() {
        this.checkStaticOnly();
        this.checkDynamicStatic();
        this.checkDynamicOnly();
    }

    addListener<E1 extends Collisionable<any>, E2 extends Collisionable<any>>
    (e1: any, e2: any, listener: (e1: E1, e2: E2) => void) {
        const s1 = e1.toString();
        const s2 = e2.toString();
        this.handlers[e1] = this.handlers[s1] || {};
        this.handlers[s1][s2] = this.handlers[s1][s2] || [];
        this.handlers[s1][s2].push(listener);
    }

    removeListener<E1 extends Collisionable<any>, E2 extends Collisionable<any>>
    (e1: any, e2: any, listener: (e1: E1, e2: E2) => void) {
        const s1 = e1.toString();
        const s2 = e2.toString();
        if(this.handlers[s1] && this.handlers[s1][s2])
            _.remove(this.handlers[s1][s2], o => o === listener);
    }

    invoke<E1 extends Collisionable<any>, E2 extends Collisionable<any>>
    (o1: E1, o2: E2){
        const e1 = o1.collisionType();
        const e2 = o2.collisionType();
        const s1 = e1.toString();
        const s2 = e2.toString();
        if(this.handlers[s1] && this.handlers[s1][s2])
            (<((e1: E1, e2: E2) => void)[]>this.handlers[s1][s2]).forEach(f => f(o1, o2));
        if(this.handlers[s2] && this.handlers[s2][s1])
            (<((e2: E2, e1: E1) => void)[]>this.handlers[s1][s2]).forEach(f => f(o2, o1));
    }
}
