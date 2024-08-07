import { ElementRef, Inject, Injectable, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
      this.initializeControls();
      this.loadOBJModelOBJLoader('assets/model.obj');
      this.animate();
      this.addResizeListener();
    }
  }

  private initializeRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initializeScene(): void {
    this.scene = new THREE.Scene();
  }
  mainUnit = 0.01;
  near = this.convertToUnit(this.mainUnit)
  far = this.convertToUnit(10000)
  aspect: number = 0;
  fov: number = 75;
  defaultFov: number = 75;

  private initializeCamera(): void {
    // กำหนดค่าตัวแปร
    const fov = this.fov; // มุมมองในแนวทแยงมุม
    const aspect = window.innerWidth / window.innerHeight; // อัตราส่วนความกว้างต่อความสูง
    const near = this.near; // ระยะทางที่ใกล้ที่สุด
    const far = this.far; // ระยะทางที่ไกลที่สุด
  
    // สร้างกล้อง PerspectiveCamera ด้วยค่าที่กำหนด
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    
    // ตั้งค่าตำแหน่งและทิศทางการมองของกล้อง
    this.camera.position.set(-10, -2, 16); // ตั้งค่าตำแหน่งกล้อง
    this.camera.lookAt(10, 0, 0); // ตั้งค่าทิศทางการมองของกล้อง
    
    // เพิ่มกล้องเข้าไปในฉาก
    this.scene.add(this.camera);
  }
  private initializeLight(): void {
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.set(0, 2, 10);
    this.scene.add(this.light);
  }

    /**
 * @ConvertToUnit use for convert meter to centimeter units
 * @parameter meter = meter unit */
    convertToUnit(meter: number) {
      return meter / this.mainUnit;
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

  // private loadGLTFModel(path: string): void {
  //   const loader = new GLTFLoader();
  //   loader.load(
  //     path,
  //     (gltf) => {
  //       const model = gltf.scene;
  //       model.position.set(0, 0, 0);
  //       model.scale.set(0.5, 0.5, 0.5);
  //       this.scene.add(model);
  //     },
  //     undefined,
  //     (error) => {
  //       console.error('Error loading GLTF model:', error);
  //     }
  //   );
  // }

  private loadOBJModelOBJLoader(path: string): void {
    const loader = new OBJLoader();
    
    loader.load(
      path,
      (object) => {
        // ปรับขนาดของโมเดลถ้าจำเป็น
        object.scale.set(1, 1, 1);
  
        // เพิ่มโมเดลลงในฉาก
        this.scene.add(object);
        
        // อัพเดตการเรนเดอร์
        this.animate();
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
        this.render();
      });
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
}