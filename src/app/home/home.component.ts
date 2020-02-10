import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { HolaMundoService } from '@app/hola-mundo-service/hola-mundo-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  title = 'Frontend';
  message = 'Sin mensaje';

  constructor(private holaMundoService: HolaMundoService) {}

  ngOnInit() {
    this.isLoading = true;
  }
}
