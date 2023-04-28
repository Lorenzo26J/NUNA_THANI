import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/service/especialidad.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { EspecialidadDialogoComponent } from './especialidad-dialogo/especialidad-dialogo.component';


@Component({
  selector: 'app-especialidad-listar',
  templateUrl: './especialidad-listar.component.html',
  styleUrls: ['./especialidad-listar.component.css']
})
export class EspecialidadListarComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad> = new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'tipo', 'descripcion', 'centro','ceditar']
  private idMayor:number = 0;
  constructor(private eS: EspecialidadService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.eS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

    });
    this.eS.getConfirmarEliminacion().subscribe(data =>{
      data==true ? this.eliminar(this.idMayor) :false;
    });

  }
  confirmar(id:number){
    this.idMayor = id;
    this.dialog.open(EspecialidadDialogoComponent);
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
  eliminar(id:number){
    this.eS.eliminar(id).subscribe(()=>{
      this.eS.list().subscribe(data=>{
        this.eS.setList(data);
      });
    });
  }

}




