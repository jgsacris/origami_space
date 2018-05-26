import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

import { sayHello } from "./greet";
import Cube from "./cube";
import ProcMesh from "./procmesh";
import WallSection from "./wall-section";
import Room from "./room";

class Main {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;
  controls: OrbitControls;

  constructor() {
    sayHello("World");
    this.init();
  }

  init() {
    // create the scene
    this.scene = new THREE.Scene();

    // create the camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;

    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent background
      antialias: true // smooth edges
    });

    // set size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let grid = new THREE.GridHelper(20, 20);
    this.scene.add(grid);

    // add canvas to dom
    document.body.appendChild(this.renderer.domElement);
    this.addLights();
    this.addContent();
    this.setupOrbitControls();
    this.animate();
  }

  addLights() {
    // add lights#
    /*
    let light = new THREE.DirectionalLight(0xffffff, 1.0)

    light.position.set(100, 100, 100)

    this.scene.add(light)

    let light2 = new THREE.DirectionalLight(0xffffff, 1.0)

    light2.position.set(-100, 100, -100)

    this.scene.add(light2)
    */

    var light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);
  }

  addContent() {
    //let cube: Cube = new Cube(10, 10, 10);
    //let cube = new WallSection();
    //this.scene.add(cube.Instance);
    //let mesh = new ProcMesh();
    //this.scene.add(mesh.Object3D);
    let room = new Room();
    this.scene.add(room.Object3D);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.render();
  }

  setupOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.onload = (ev: Event) => {
  let main = new Main();
};
