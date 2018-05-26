import * as THREE from 'three';

export default class Cube {

  private box: THREE.Mesh;

  constructor(width = 1, height = 1, depth = 1) {
    let geometry = new THREE.BoxGeometry(width, height, depth);
    let material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true
    })
    this.box = new THREE.Mesh(geometry, material);
  }

  get Instance(): THREE.Mesh {
    return this.box;
  }
}