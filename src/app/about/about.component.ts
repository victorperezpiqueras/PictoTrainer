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
  checked = false;
  isOn = false;
  constructor() {}

  ngOnInit() {
    var sonido: any;
    sonido = localStorage.getItem('sonido');
    this.isOn = JSON.parse(sonido);
  }

  state1() {
    if (!this.isOn) {
      this.isOn = true;
    } else {
      this.isOn = false;
    }
    console.log(this.isOn);
    console.log(JSON.stringify(this.isOn));

    localStorage.setItem('sonido', JSON.stringify(this.isOn));
  }
}
