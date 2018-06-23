import * as THREE from "three";

import "three/examples/js/modifiers/SubdivisionModifier.js";
import SceneUtils2 from "./SceneUtils2";

export default class Roof {
  private roof: THREE.Group;
  private color: THREE.Color = new THREE.Color(0xff3300);

  get Instance(): THREE.Group {
    return this.roof;
  }

  constructor(points: Array<THREE.Vector2>) {
    console.log("points", points);

    let material = new THREE.MeshLambertMaterial({
      color: this.color,
      side: THREE.DoubleSide,
      wireframe: false
    });

    let materials = [
      material,
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    ];

    let roofShape = new THREE.Shape(points);

    let geometry = new THREE.ShapeBufferGeometry(roofShape);

    let tempPoints = [
      new THREE.Vector2(3, -8),
      new THREE.Vector2(-2, -7),
      new THREE.Vector2(-11, -4)
    ];

    let temp = new THREE.Shape(tempPoints);
    let tempGeo = new THREE.ShapeBufferGeometry(temp);

    //geometry.merge(tempGeo, 0);
    let modifier = new THREE_EXT.SubdivisionModifier(3);
    modifier.modify(geometry);
    this.roof = SceneUtils2.createMultiMaterialObject(geometry, materials);
    this.roof.rotateX(Math.PI / 2);
  }
}
