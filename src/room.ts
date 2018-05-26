import * as THREE from "three";

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
    this.radius = perimeter / (2 * Math.PI);
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
    let material = new THREE.MeshLambertMaterial({
      color: this.colors[0],
      side: THREE.DoubleSide
    });
    let geometry = new THREE.PlaneGeometry(this.wallWidths[0], this.wallHeight);
    //change rotation pivot

    geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(
        this.wallWidths[0] / 2,
        this.wallHeight / 2,
        0
      )
    );

    let wall = new THREE.Mesh(geometry, material);
    //let cAngle = this.angles[0] / 2;
    let cAngle = 0;
    this.logAngle(cAngle);
    wall.rotateY(cAngle);
    let cX = 0;
    let cZ = this.radius;
    wall.position.set(cX, 0, cZ);

    this.roomGO.add(wall);
    cX += Math.cos(cAngle) * this.wallWidths[0];
    cZ += Math.sin(cAngle) * this.wallWidths[0];
    console.log("x:z = ", cX, cZ);
    for (let i = 1; i < this.noOfWalls; i++) {
      material = new THREE.MeshLambertMaterial({
        color: this.colors[i],
        side: THREE.DoubleSide
      });
      geometry = new THREE.PlaneGeometry(this.wallWidths[i], this.wallHeight);

      geometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(
          this.wallWidths[i] / 2,
          this.wallHeight / 2,
          0
        )
      );

      wall = new THREE.Mesh(geometry, material);
      cAngle += this.angles[i];
      console.log("color: ", this.colors[i].toString(16), cX, cZ);
      this.logAngle(cAngle);
      wall.rotateY(cAngle);
      wall.position.set(cX, 0, cZ);
      cX += Math.cos(-cAngle) * this.wallWidths[i];
      cZ += Math.sin(-cAngle) * this.wallWidths[i];
      this.roomGO.add(wall);
    }
  }

  logAngle(rad: number) {
    console.log("angle", rad * 180 / Math.PI);
  }
}
