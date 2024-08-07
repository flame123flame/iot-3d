import { ElementRef, Inject, Injectable, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isPlatformBrowser } from '@angular/common';

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
      this.loadGLTFModel('assets/mainTree.glb');
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

  private initializeCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 7, 16);
    this.camera.lookAt(10, 0, 0);
    this.scene.add(this.camera);
  }

  private initializeLight(): void {
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.set(0, 2, 10);
    this.scene.add(this.light);
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

  private loadGLTFModel(path: string): void {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(0.5, 0.5, 0.5);
        this.scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
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