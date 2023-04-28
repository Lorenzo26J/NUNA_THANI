import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { Rutinas_recreativas } from 'src/app/model/rutinas_recreativas';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-rutinas_recreativas-insertar',
  templateUrl: './rutinas_recreativas-insertar.component.html',
  styleUrls: ['./rutinas_recreativas-insertar.component.css'],
})
export class Rutinas_recreativasInsertarComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  rutinas_recreativas: Rutinas_recreativas = new Rutinas_recreativas();
  mensaje: string = '';

  constructor(private rS: Rutinas_recreativasService, private router: Router, private route: ActivatedRoute) {}

  

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });


    
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      descripcion: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    });

  }

  aceptar(): void {
    if (/\d/.test(this.form.value['nombre'])) {
      this.form.controls['nombre'].setErrors({ 'incorrect': true });
      this.mensaje = 'El campo "nombre" no puede contener números';
      return;
    }
    
    if (/\d/.test(this.form.value['descripcion'])) {
      this.form.controls['descripcion'].setErrors({ 'incorrect': true });
      this.mensaje = 'El campo "descripcion" no puede contener números';
      return;
    }
    if (this.form.valid) {
      
      this.rutinas_recreativas.id = this.id;
      this.rutinas_recreativas.nombre = this.form.value['nombre'];
      this.rutinas_recreativas.descripcion = this.form.value['descripcion'];

      if (this.edicion) {
        // guardar lo actualizado
        this.rS.update(this.rutinas_recreativas).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rutinas_recreativas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rutinas_recreativas']);
    } else {
      this.mensaje = 'Debe rellenar los datos obligatoriamente';
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl({value: data.id, disabled: true}), //validacion
          nombre: new FormControl(data.nombre, Validators.required), //valid
        });
      });
    }
  }
}
