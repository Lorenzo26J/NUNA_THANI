import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { Disponibilidad } from 'src/app/model/disponibilidad';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-disponibilidad-insertar',
  templateUrl: './disponibilidad-insertar.component.html',
  styleUrls: ['./disponibilidad-insertar.component.css'],
})

export class DisponibilidadInsertarComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});

  disponibilidad: Disponibilidad = new Disponibilidad();
  mensaje: string = '';
  //maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(private dS: DisponibilidadService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      inicio_turno: new FormControl(),
      fin_turno: new FormControl(),
      dias_laborales: new FormControl(),
    });
  }
  aceptar(): void {
    this.disponibilidad.id = this.form.value['id'];
    this.disponibilidad.inicio_turno = this.form.value['inicio_turno'];
    this.disponibilidad.fin_turno = this.form.value['fin_turno'];
    this.disponibilidad.dias_laborales = this.form.value['dias_laborales'];

    // Expresión regular para validar formato de hora HH:mm
  const horaRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  // Eliga un dia laborable
  if (this.form.value['dias_laborales'].length === 0) {
    this.mensaje = 'Elija el o los días laborables!!';
    return;
  }

  // Validar formato de hora en inicio_turno
  if (!horaRegex.test(this.form.value['inicio_turno'])) {
    this.mensaje = 'Ingrese un horario válido para inicio del turno (HH:mm)!!';
    return;
  }

  // Validar formato de hora en fin_turno
  if (!horaRegex.test(this.form.value['fin_turno'])) {
    this.mensaje = 'Ingrese un horario válido para fin del turno (HH:mm)!!';
    return;
  }

    if (
      this.form.value['inicio_turno'] > 0 &&
      this.form.value['inicio_turno'] <= 24 &&
      this.form.value['fin_turno'] > 0 &&
      this.form.value['fin_turno'] <= 24
    ) {
      // Tu código aquí
    } else {
      this.mensaje = 'Ingrese un horario real!!';
    }


    // Corrección en el bloque condicional
    if ( this.form.value['inicio_turno'].length > 0 && this.form.value['fin_turno'].length > 0) {
    if (this.edicion) {
      //guardar lo actualizado
      this.dS.update(this.disponibilidad).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });}
      else {
        this.dS.insert(this.disponibilidad).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['disponibilidad']);
    }else {
      this.mensaje = 'Ingrese un horario real!!';
    }

  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl({value: data.id, disabled: true}),
          inicio_turno: new FormControl(data.inicio_turno),
          fin_turno: new FormControl(data.fin_turno),
          dias_laborales: new FormControl(data.dias_laborales),
        });
        console.log(data)
      });
    }
  }
}
