import { Component,OnInit } from '@angular/core';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-disponibilidad-dialogo',
  templateUrl: './disponibilidad-dialogo.component.html',
  styleUrls: ['./disponibilidad-dialogo.component.css']
})
export class DisponibilidadDialogoComponent implements OnInit {
  constructor(private dS: DisponibilidadService,
    private dialogRef: MatDialogRef<DisponibilidadDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.dS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }
  }