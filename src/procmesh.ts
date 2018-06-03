import * as THREE from "three";

import SceneUtils2 from "./SceneUtils2";

export default class ProcMesh {
  private vertices: THREE.Vector3[];
  private faces: THREE.Face3[];
  private mesh: THREE.Object3D;

  constructor() {
    this.vertices = [
      new THREE.Vector3(1, 3, 1),
      new THREE.Vector3(1, 3, -1),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 3, -1),
      new THREE.Vector3(-1, 3, 1),
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(-1, -1, 1)
    ];

    this.faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4)
    ];

    let geometry = new THREE.Geometry();
    geometry.vertices = this.vertices;
    geometry.faces = this.faces;
    geometry.computeFaceNormals();
    let materials = [
      new THREE.MeshLambertMaterial({
        opacity: 0.6,
        color: 0x44ff44,
        transparent: true
      }),
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    ];

    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    this.mesh = SceneUtils2.createMultiMaterialObject(
      bufferGeometry,
      materials
    );
  }

  get Object3D(): THREE.Object3D {
    return this.mesh;
  }
}
