import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit():void{}

}
