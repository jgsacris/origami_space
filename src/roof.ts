import * as THREE from "three";
import SceneUtils2 from "./SceneUtils2";

export default class Roof {
  private roof: THREE.Group;
  private color: THREE.Color = new THREE.Color(0xff3300);

  get Instance(): THREE.Group {
    return this.roof;
  }

  constructor(points: Array<THREE.Vector2>) {
    var roofShape = new THREE.Shape(points);
    let material = new THREE.MeshLambertMaterial({
      color: this.color,
      side: THREE.DoubleSide,
      wireframe: false
    });

    let materials = [
      material,
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    ];
    var geometry = new THREE.ShapeBufferGeometry(roofShape);

    this.roof = SceneUtils2.createMultiMaterialObject(geometry, materials);
    this.roof.rotateX(Math.PI / 2);
  }
}
