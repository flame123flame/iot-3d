import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsRendererService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private spotLight!: THREE.SpotLight;
  private groundMesh!: THREE.Mesh;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  initialize(container: HTMLDivElement): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupRenderer(container);
      this.setupSceneAndCamera();
      this.setupControls();
      this.createGround();
      this.createLights();
      this.loadModel();

      window.addEventListener('resize', this.onWindowResize.bind(this), false);

      this.animate();
    }
  }

  private setupRenderer(container: HTMLDivElement): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);
  }

  private setupSceneAndCamera(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(4, 5, 11);
  }

  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = 0.5;
    this.controls.maxPolarAngle = 1.5;
    this.controls.autoRotate = false;
    this.controls.target = new THREE.Vector3(0, 1, 0);
    this.controls.update();
  }

  private createGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.castShadow = false;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);
  }

  private createLights(): void {
    this.spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
    this.spotLight.position.set(0, 25, 0);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.bias = -0.0001;
    this.scene.add(this.spotLight);
  }

  
  private loadOBJModel(path: string): void {
 
  }

  private loadModel(): void {

    const loader = new OBJLoader();
    loader.load(
     'assets/model.obj',
      (object) => {

        object.scale.set(0.6, 0.6, 0.6);

        // Calculate the bounding box to find the center
        const boundingBox = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        
        // Move the object to the center of the scene
        object.position.sub(center);
        
        this.scene.add(object);

        const progressContainer = document.getElementById('progress-container');
        if (progressContainer) {
          progressContainer.style.display = 'none';
        }
        // Log the position of the object
        console.log('Model Position:', object.position);

        // this.animate(); 
      },
      undefined,
      // Called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
      }
    );


    // const loader = new OBJLoader();
    // loader.load('assets/model.obj', (object) => {
    //   console.log('loading model');
    //   object.traverse((child: any) => {
    //     if (child.isMesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //     }
    //   });

    //   object.position.set(0, 0, -1);
    //   this.scene.add(object);

    //   const progressContainer = document.getElementById('progress-container');
    //   if (progressContainer) {
    //     progressContainer.style.display = 'none';
    //   }
    // }, (xhr) => {
    //   console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
    // }, (error) => {
    //   console.error(error);
    // });
  }

  private onWindowResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(render);
      };
      render();
    });
  }
}
