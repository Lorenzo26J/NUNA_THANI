import { Component, OnInit } from '@angular/core';
import { Rutinas_recreativas } from 'src/app/model/rutinas_recreativas';
import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { Rutinas_recreativasDialogoComponent } from './rutinas-recreativas-dialogo/rutinas-recreativas-dialogo.component';
@Component({
  selector: 'app-rutinas_recreativas-listar',
  templateUrl: './rutinas_recreativas-listar.component.html',
  styleUrls: ['./rutinas_recreativas-listar.component.css'],
})
export class Rutinas_recreativasListarComponent implements OnInit {
  dataSource: MatTableDataSource<Rutinas_recreativas> = new MatTableDataSource();
  lista: Rutinas_recreativas[] = [];
  displayedColumns: string[] = [
    'No',
    'Nombre de la rutina recreativa',
    'Descripcion',
    'ceditar',
  ];
  private idMayor:number=0;
  constructor(private rS: Rutinas_recreativasService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(Rutinas_recreativasDialogoComponent);
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }

}
