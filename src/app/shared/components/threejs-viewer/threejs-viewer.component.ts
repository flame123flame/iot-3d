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
export class ThreejsViewerComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  constructor(
    private threeJsRendererService: ThreeJsRendererService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.threeJsRendererService.initialize(this.container.nativeElement);
    }
  }
}
