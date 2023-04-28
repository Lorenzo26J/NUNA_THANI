import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-insertar',
  templateUrl: './usuario-insertar.component.html',
  styleUrls: ['./usuario-insertar.component.css']
})
export class UsuarioInsertarComponent implements OnInit{
  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  constructor(private uS: UsuarioService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      nameUsuario: new FormControl(),
      SnameUsuario: new FormControl(),
      PassUsuario: new FormControl(),
      telusuario: new FormControl(null, [Validators.pattern('^[0-9]{9}$')]),
    });
  }
  aceptar(): void {
    this.usuario.id = this.form.value['id'];
    this.usuario.nameUsuario = this.form.value['nameUsuario'];
    this.usuario.SnameUsuario = this.form.value['SnameUsuario'];
    this.usuario.PassUsuario = this.form.value['PassUsuario'];
    this.usuario.telusuario = this.form.value['telusuario'];

    if (this.form.valid) {
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuario']);
    } else {
      this.mensaje = 'Ingrese datos validos!!';
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl({value: data.id, disabled: true}),
          nameUsuario: new FormControl(data.nameUsuario),
          SnameUsuario: new FormControl(data.SnameUsuario),
          PassUsuario: new FormControl(data.PassUsuario),
          telusuario: new FormControl(data.telusuario, [Validators.pattern('^[0-9]{9}$')]),
        });
      });
    }
  }
}
