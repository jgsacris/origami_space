import * as THREE from 'three';

import SceneUtils2 from './SceneUtils2';

export default class WallSection {
    private box: THREE.Mesh;
    private vertices:THREE.Vector3[];
    private faces: THREE.Face3[];
    private mesh: THREE.Object3D;

    constructor(){
        this.vertices = [
            new THREE.Vector3(-1, -1, 0),
            new THREE.Vector3(1, -1, 0),
            new THREE.Vector3(1, 1, 0),
            new THREE.Vector3(-1, 1, 0)
        ];

        this.faces = [
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3)
        ];
        
        let geom = new THREE.Geometry();
        geom.vertices = this.vertices;
        geom.faces = this.faces;
        geom.computeFaceNormals();

        let material = new THREE.MeshLambertMaterial({ color: 0x44ff44, side: THREE.DoubleSide});
        this.box = new THREE.Mesh(geom, material);
    }

    get Instance(): THREE.Mesh {
        return this.box;
    }

}
