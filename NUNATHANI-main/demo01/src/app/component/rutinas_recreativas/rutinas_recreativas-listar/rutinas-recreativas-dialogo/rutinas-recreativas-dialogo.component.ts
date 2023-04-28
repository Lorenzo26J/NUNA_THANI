import { Component,OnInit } from '@angular/core';
import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-rutinas-recreativas-dialogo',
  templateUrl: './rutinas-recreativas-dialogo.component.html',
  styleUrls: ['./rutinas-recreativas-dialogo.component.css']
})
export class Rutinas_recreativasDialogoComponent implements OnInit {
  constructor(private rS: Rutinas_recreativasService,
    private dialogRef: MatDialogRef<Rutinas_recreativasDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.rS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }
  }