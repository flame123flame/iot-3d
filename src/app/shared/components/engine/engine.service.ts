import { ElementRef, Inject, Injectable, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isPlatformBrowser } from '@angular/common';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private controls!: OrbitControls;
  private frameId?: number;
  private model!: THREE.Object3D; // ตัวแปรเก็บโมเดล

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.frameId != null) {
        cancelAnimationFrame(this.frameId);
      }
      if (this.renderer != null) {
        this.renderer.dispose();
      }
      if (this.controls != null) {
        this.controls.dispose();
      }
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas = canvas.nativeElement;
      this.initializeRenderer();
      this.initializeScene();
      this.initializeCamera();
      this.initializeLight();
      this.initGround();
      this.initializeControls();
      this.loadOBJModel('assets/model.obj');
      // this.animate();
      this.addResizeListener();
      this.onTick();
    }
  }

  private initializeRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x8B4513, 0); 
  }

  private initializeScene(): void {
    this.scene = new THREE.Scene();
  }
  
  mainUnit = 0.01;
  near = this.convertToUnit(this.mainUnit);
  far = this.convertToUnit(10000);
  aspect: number = 0;
  fov: number = 75;
  defaultFov: number = 75;

  private initializeCamera(): void {
    const fov = this.fov;
    const aspect = window.innerWidth / window.innerHeight;
    const near = this.near;
    const far = this.far;
  
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(-120, 100, 140);
    this.scene.add(this.camera);
  }

  private initializeLight(): void {
    this.light = new THREE.AmbientLight(0x404040);
    this.scene.add(this.light);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);
  }
  
  convertToUnit(meter: number): number {
    return meter / this.mainUnit;
  }

  degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private initializeControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.enableRotate = true;
    this.controls.rotateSpeed = 1.0;
  }

  private loadOBJModel(path: string): void {
    const loader = new OBJLoader();
    
    loader.load(
      path,
      (object) => {
        this.model = object; // เก็บโมเดล
        object.scale.set(1, 0.8, 1);
        this.scene.add(object);
        // this.animate(); // เรียกใช้งานการหมุน
      },
      undefined,
      (error) => {
        console.error('An error happened', error);
      }
    );
  }

  private animate(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.frameId = requestAnimationFrame(() => this.animate());
        this.updateRotation(); // อัปเดตการหมุน
        this.render();
      });
    }
  }

  private updateRotation(): void {
    if (this.model) {
      this.model.rotation.y += 0.001; // ลดความเร็วในการหมุน
    }
  }

  private render(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  private resizeHandler = (): void => {
    this.resize();
  };

  private resize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  public addResizeListener(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  private initGround() {
    const groundSize = {
      width: this.convertToUnit(10),
      height: this.convertToUnit(0),
      depth: this.convertToUnit(10)
    }
    const texture = new THREE.TextureLoader().load('assets/grasslight-big.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100)
    const groundProperty = {
      geometry: new THREE.BoxGeometry(groundSize.width, groundSize.height, groundSize.depth),
      material: new THREE.MeshBasicMaterial({ map: texture }),
    }
    const ground = new THREE.Mesh(groundProperty.geometry, groundProperty.material)
    ground.position.x = 0
    ground.position.y = 0
    ground.position.z = 0
    this.scene.add(ground)
  }

  private detectCameraPosition() {
    if (this.camera.position.y < 2) {
      this.camera.position.y = 2;
    }
  }
  
  private onTick() {
    this.controls.update();
    this.detectCameraPosition();
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
    window.requestAnimationFrame(() => this.onTick());
  }

}
