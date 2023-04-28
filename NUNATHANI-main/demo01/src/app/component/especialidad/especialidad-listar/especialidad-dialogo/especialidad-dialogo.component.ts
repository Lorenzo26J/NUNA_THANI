import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-especialidad-dialogo',
  templateUrl: './especialidad-dialogo.component.html',
  styleUrls: ['./especialidad-dialogo.component.css']
})
export class EspecialidadDialogoComponent implements OnInit{
constructor(private eS:EspecialidadService,
  private dialogoRef: MatDialogRef<EspecialidadDialogoComponent>){}
  ngOnInit():void{}
  confirmar(estado: boolean){
    this.eS.setConfirmarEliminacion(estado);
    this.dialogoRef.close();
  }

}
