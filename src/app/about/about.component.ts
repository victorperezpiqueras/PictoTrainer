import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

/* import  * as ProgressBar from '../../../node_modules/progressbar.js/dist/progressbar.js';
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
  barColor: string;
  constructor() {}

  ngOnInit() {
    this.barColor = localStorage.getItem('bar-color');
    if (!this.barColor || this.barColor != undefined || this.barColor != null) this.barColor = '#FFEA82';
    //var ProgressBar = require('progressbar.js')
    var line = new ProgressBar.Line('#container');
    var bar = new ProgressBar.Line('#container', {
      strokeWidth: 30,
      duration: 10000,
      color: this.barColor,
      trailColor: '#eee',
      trailWidth: 30,
      svgStyle: { width: '100%', height: '100%' },
      from: { color: this.barColor },
      to: { color: '#ED6A5A' },
      step: (state: any, bar: any) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });

    bar.animate(1.0);
  }
}
