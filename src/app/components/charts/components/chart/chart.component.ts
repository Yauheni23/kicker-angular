import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Chart, ChartObject, Options } from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.styl'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges, OnDestroy {
  @Input() options: Options;
  @Input() chart: ChartObject;
  @Output() chartChange: EventEmitter<ChartObject> = new EventEmitter();

  @ViewChild('element', {static: true}) element: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  protected destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  protected renderChart() {
    this.destroyChart();
    this.chartChange.emit(
        this.chart = new Chart(this.element.nativeElement, this.options)
    );
  }
}
