import { Employee } from './../model/Employee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeList: Employee[] = [
    {
      id: 111,
      name: 'Amar',
      mobile: 9874563210,
      department: 'IT',
      dateOfJoin: new Date('3/25/2018')
    },
    {
      id: 112,
      name: 'Akabar',
      mobile: 7894561230,
      department: 'HR',
      dateOfJoin: new Date('5/11/2018')
    },
    {
      id: 113,
      name: 'Anthony',
      mobile: 4563210789,
      department: 'Finance',
      dateOfJoin: new Date('11/27/2018')
    }    
  ];

  constructor() { }

  getNewEmployee(): Employee {
    return {
      id: null,
      name: null,
      mobile: null,
      department: 'select',
      dateOfJoin: null
    }
  }
  getEmployees(): Employee[] {
    return this.employeeList;
  }
  saveEmployee(employee: Employee) {
    return this.employeeList.push(employee);                  //to add new record at the end list
    // return this.listEmployees.splice(0, 0, employee);     //to add new record at top of the list
  }
  deleteEmployee(index: number) {
    return this.employeeList.splice(index, 1);
  }
  updateEmployee(employee: Employee, index: number) {
    this.employeeList.splice(index, 1);
    return this.employeeList.push(employee);

  }
}
