import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent {
  datos: any;
  employees: any;
  isCumpleannos: string = "";
  showListEmployeesBirthday: any;
  diasParaCumple: number = 0;

  constructor(private route: ActivatedRoute,
              private http: HttpClient){}

  async ngOnInit() {
    console.log("ngOnInit");
    debugger;
    this.route.params.subscribe(params => {
      this.datos = JSON.parse(params['respuesta']);      
      console.log(this.datos.upn);
    });    
    
    this.showListEmployeesBirthday = await this.showListEmployeeBirthday();
    
    const birthday = new Date(this.datos.BirthDate);
    this.diasParaCumple = calcularDiasParaCumple(birthday);
    this.isCumpleannos = this.isBirthday();
  }

  isBirthday(): string{          
    const birthdayString = this.datos.BirthDate;
    const birthday = new Date(birthdayString);
    
    const today = new Date();

    const isBirth: Boolean = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
    
    if (isBirth) {
      return "¡¡Felicidades es tu cumpleaños!!";
    }else{
      return "Quedan " + this.diasParaCumple + " para el día de tu cumpleaños";
    }      
  }

  async getAllEmployees(): Promise<any>{
    debugger;
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);

    try {
      const response = await this.http.get<any>(`https://localhost:8080/employee/getAll`).toPromise();
      if (response.Result != null) {
        console.log(response.Result);
        debugger;
        return response.Result.filter((emp: { BirthDate: string | number | Date; }) => {
          const birthday = new Date(emp.BirthDate);
          return birthday >= startOfWeek && birthday <= endOfWeek;
        });
      } else {
        alert("No hay datos para mostrar");
        console.log(response);
        return "";
      }
    } catch (error) {
      alert(error);
      console.error(error);
      throw error;
    }
  }

  async showListEmployeeBirthday(): Promise<any>{
          
    debugger;
    const employees = await this.getAllEmployees();
       

    return employees;    
  }
}
function calcularDiasParaCumple(BirthDate: Date):number {
  const today = new Date();

  // Establecer el año actual en la fecha de cumpleaños
  const currentYearBirthday = new Date(today.getFullYear(), BirthDate.getMonth(), BirthDate.getDate());

  // Comprobar si la fecha de cumpleaños ya ha pasado en este año
  if (currentYearBirthday < today) {
    // Si ya ha pasado, sumar un año al año actual
    currentYearBirthday.setFullYear(currentYearBirthday.getFullYear() + 1);
  }

  // Calcular la diferencia en milisegundos entre la fecha de cumpleaños y la fecha actual
  const timeDiff = currentYearBirthday.getTime() - today.getTime();

  // Calcular el número de días restantes
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysRemaining;
}

