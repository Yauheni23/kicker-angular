import { TooltipOptions } from 'highcharts';

export class ChartTooltipBase implements TooltipOptions {
  enabled = true;
  shared = true;
  useHTML = true;
  shadow = true;
  borderColor = null;
  borderWidth = 1;
  padding: 0;
  borderRadius = 3;
  backgroundColor = '#fff';
  outside = false;
  style: object = {
    padding: 0
  };
  formatter: any;
  positioner: any;
}
