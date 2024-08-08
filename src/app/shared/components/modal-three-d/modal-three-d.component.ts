import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ModelThreeDService } from './model-three-d.service';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-modal-three-d',
  templateUrl: './modal-three-d.component.html',
  styleUrls: ['./modal-three-d.component.scss'],
  standalone: true,
  imports: [SharedModule, FormsModule, NzSliderModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalThreeDComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;
  opacity: number = 100;
  public constructor(private threeD: ModelThreeDService) {
  }

  public ngOnInit(): void {
    this.threeD.createScene(this.rendererCanvas);
  }

  onChangeOpacity(value: number) {
    this.threeD.changeOpacityBuildingModel(value);
  }

}
