import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ThreeJsRendererService } from '../../service/threejs-renderer.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-threejs-viewer',
  standalone: true,
  imports: [],
  templateUrl: './threejs-viewer.component.html',
  styleUrl: './threejs-viewer.component.scss'
})
export class ThreejsViewerComponent  {
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: ThreeJsRendererService) {
  }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);

  }
}
