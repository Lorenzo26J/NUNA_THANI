import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';


@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  lista: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['no', 'nombre', 'apellido', 'contraseña', 'telefono', 'ceditar']
  private idMayor: number = 0;

  constructor(private uS: UsuarioService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    });
  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(UsuarioDialogoComponent);
  }
  eliminar(id: number) {
    this.uS.eliminar(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }

  filtrar(u: any) {
    this.dataSource.filter = u.target.value.trim();
  }
}



