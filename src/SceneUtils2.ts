import * as THREE from "three";

export default class SceneUtils2 {
  static createMultiMaterialObject(
    geometry: THREE.BufferGeometry,
    materials: Array<THREE.Material>
  ) {
    var group = new THREE.Group();

    for (var i = 0, l = materials.length; i < l; i++) {
      group.add(new THREE.Mesh(geometry, materials[i]));
    }

    return group;
  }

  static detach(
    child: THREE.Object3D,
    parent: THREE.Object3D,
    scene: THREE.Scene
  ) {
    child.applyMatrix(parent.matrixWorld);
    parent.remove(child);
    scene.add(child);
  }

  static attach(
    child: THREE.Object3D,
    scene: THREE.Scene,
    parent: THREE.Object3D
  ) {
    child.applyMatrix(new THREE.Matrix4().getInverse(parent.matrixWorld));

    scene.remove(child);
    parent.add(child);
  }
}
