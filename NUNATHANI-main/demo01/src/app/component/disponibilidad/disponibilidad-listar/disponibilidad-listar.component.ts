import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/model/disponibilidad';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DisponibilidadDialogoComponent } from './disponibilidad-dialogo/disponibilidad-dialogo.component';

@Component({
  selector: 'app-disponibilidad-listar',
  templateUrl: './disponibilidad-listar.component.html',
  styleUrls: ['./disponibilidad-listar.component.css'],
})
export class DisponibilidadListarComponent implements OnInit {
  dataSource: MatTableDataSource<Disponibilidad> = new MatTableDataSource();
  lista: Disponibilidad[] = [];
  displayedColumns: string[] = [
    'No',
    'Inicio del turno',
    'Fin del turno',
    'Dias laborales',
    'ceditar',
  ];
  private idMayor: number = 0;
  constructor(private dS: DisponibilidadService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    });
  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(DisponibilidadDialogoComponent);
  }
  eliminar(id: number) {
    this.dS.eliminar(id).subscribe(() => {
      this.dS.list().subscribe(data => {
        this.dS.setList(data);
      });
    });
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
