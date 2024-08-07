import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EngineService } from './engine.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-engine',
  standalone: true,
  imports: [SharedModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.scss'
})
export class EngineComponent {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) {
  }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);

  }

}

