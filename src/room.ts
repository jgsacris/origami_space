import * as THREE from "three";
import Roof from "./roof";
import { Vector3 } from "three";

export default class Room {
  private wallLength: number = 6;
  private noOfWalls: number = 4;
  private wallHeight: number = 3;
  private static readonly difConstant: number = 1.05;
  private radius: number;
  private angles: number[];
  private wallWidths: number[];
  private roomGO: THREE.Object3D;
  private colors: number[] = [
    0x00ffff,
    0x0000ff,
    0xff00ff,
    0xff0000,
    0xffff00,
    0x00ff00
  ];

  private roomCorners: Array<THREE.Vector2>;

  constructor(noOfWalls: number = 6) {
    this.noOfWalls = noOfWalls;
    this.calculateRadius();
    this.calculateAngles();
    this.calculateWallWidths();
    this.positionWalls();
  }

  get Object3D(): THREE.Object3D {
    return this.roomGO;
  }

  calculateRadius() {
    // debugger;
    let perimeter = this.noOfWalls * this.wallLength * Room.difConstant;
    this.radius = Math.round(perimeter / (2 * Math.PI));
    console.log("radius", this.radius);
  }
  /**
   * Generate four random numbers between 0 and 1
   * Add these four numbers;
   * then divide each of the four numbers by the sum,
   * multiply by 100, and round to the nearest integer.
   */
  calculateAngles() {
    let rand: number[] = [];
    let sum: number = 0;
    for (let i = 0; i < this.noOfWalls; i++) {
      let cNum = Math.random() * 0.5 + 0.5;
      sum += cNum;
      rand.push(cNum);
    }
    let sum2 = 0;
    let total = Math.PI * 2;
    this.angles = [];
    for (let i = 0; i < this.noOfWalls - 1; i++) {
      let angle = rand[i] / sum * total;
      this.logAngle(angle);
      sum2 += angle;
      this.angles.push(angle);
    }
    let last = total - sum2;
    this.logAngle(last);
    this.angles.push(last);
    this.logAngle(sum2 + last);
  }

  calculateWallWidths() {
    this.wallWidths = [];
    for (let i = 0; i < this.noOfWalls; i++) {
      let width = Math.sin(this.angles[i]) * this.radius * 2;
      console.log("width", width);
      this.wallWidths.push(width);
    }
  }

  positionWalls() {
    console.log("positioning walls");
    this.roomGO = new THREE.Object3D();

    let cAngle = 0;
    let cX = 0;
    let cZ = this.radius;
    this.roomCorners = new Array<THREE.Vector2>();
    this.roomCorners.push(new THREE.Vector2(cX, cZ));
    let wall: THREE.Mesh;
    let material: THREE.Material;
    let geometry: THREE.Geometry;
    let i = 0;
    for (i; i < this.noOfWalls - 1; i++) {
      wall = this.createWall(this.wallWidths[i], this.colors[i]);
      cAngle += this.angles[i];
      //console.log("color: ", this.colors[i].toString(16), cX, cZ);
      //this.logAngle(cAngle);
      wall.rotateY(cAngle);
      wall.position.set(cX, 0, cZ);
      this.roomGO.add(wall);
      cX += Math.cos(-cAngle) * this.wallWidths[i];
      cZ += Math.sin(-cAngle) * this.wallWidths[i];
      this.roomCorners.push(new THREE.Vector2(cX, cZ));
    }

    this.wallWidths[i] = Math.sqrt(
      Math.pow(cX, 2) + Math.pow(cZ - this.radius, 2)
    );

    wall = this.createWall(this.wallWidths[i], this.colors[i]);
    cAngle = Math.atan2(this.radius - cZ, -cX);
    wall.rotateY(-cAngle);
    wall.position.set(cX, 0, cZ);
    this.roomGO.add(wall);
    var roof = this.createRoof();
    roof.position.add(new Vector3(0, this.wallHeight, 0));
    this.roomGO.add(roof);
    console.log("corners", this.roomCorners);
  }

  createWall(width: number, color: number): THREE.Mesh {
    let material = new THREE.MeshLambertMaterial({
      color: color,
      side: THREE.DoubleSide
    });
    let geometry = new THREE.PlaneGeometry(width, this.wallHeight);

    geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(width / 2, this.wallHeight / 2, 0)
    );

    return new THREE.Mesh(geometry, material);
  }

  createRoof() {
    return new Roof(this.roomCorners).Instance;
  }

  logAngle(rad: number) {
    console.log("angle", rad * 180 / Math.PI);
  }
}
