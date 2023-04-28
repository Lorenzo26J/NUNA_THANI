import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rutinas_recreativas',
  templateUrl: './rutinas_recreativas.component.html',
  styleUrls: ['./rutinas_recreativas.component.css'],
})
export class Rutinas_recreativasComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
