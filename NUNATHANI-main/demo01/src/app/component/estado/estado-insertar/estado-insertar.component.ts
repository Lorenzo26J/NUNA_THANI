import { EstadoService } from 'src/app/service/estado';
import { Estado } from 'src/app/model/estado';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-estado-insertar',
  templateUrl: './estado-insertar.component.html',
  styleUrls: ['./estado-insertar.component.css'],
})
export class EstadoInsertarComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;


  form: FormGroup = new FormGroup({});
  estado: Estado = new Estado();
  mensaje: string = '';
  //maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(private rS: EstadoService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      disponibilidad: new FormControl(),
    });
  }


  
  aceptar(): void {
    this.estado.id = this.form.value['id'];
    this.estado.disponibilidad = this.form.value['disponibilidad'];

    if (this.form.status=="INVALID") {
      this.mensaje = 'Seleccione un tipo de disponibilidad';
      return;
    }
    // Corrección en el bloque condicional
    
    if (this.edicion) {
      //guardar lo actualizado
      this.rS.update(this.estado).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });}
      else {
        this.rS.insert(this.estado).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['estado']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          disponibilidad: new FormControl(data.disponibilidad),
        });
      });
    }
  }
}
