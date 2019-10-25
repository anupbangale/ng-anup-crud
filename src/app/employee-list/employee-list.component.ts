import { Employee } from './../model/Employee.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  display: boolean = false;
  departments = [];
  registrationForm: FormGroup;
  employees: Employee[];
  i = 1;
  buttonLable: string;
  isEditClicked = false;
  index: number;
  employee: Employee;
  tempEmp: Employee;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { };

  ngOnInit() {
    this.departments = [
      { label: 'Select Department', value: null },
      { label: 'HR', value: 'HR' },
      { label: 'IT', value: 'IT' },
      { label: 'Finance', value: 'Finance' }
    ];
    this.employees = this.employeeService.getEmployees();
    this.loadEmployee();
    this.loadRegistrationForm();
  }

  loadRegistrationForm() {
    this.registrationForm = this.fb.group({
      empName: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      mob: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
        Validators.pattern('^.{10,11}$')
      ]),
      doj: new FormControl('', Validators.required)
    });
  }
  loadEmployee() {
    this.employee = this.employeeService.getNewEmployee();
  }

  onRegisterClick() {
    this.buttonLable = "Register";
    this.display = true;
    this.loadEmployee();
    this.loadRegistrationForm();
  }
  onEditClick(emp) {
    this.isEditClicked = true;
    this.buttonLable = "Update";
    this.display = true;
    this.employee = { ...emp };
    this.tempEmp = { ...emp };
    this.index = this.employees.indexOf(emp);
  }

  registerEmployee() {
    if (this.isEditClicked) {
      this.updateEmp();
      this.showUpdateTost();
    }
    else {
      this.addNewEmployee();
      this.showRegisterTost();
    }
    this.display = false;
  }
  updateEmp() {
    this.isEditClicked = false;
    this.employeeService.updateEmployee(this.employee, this.index);
  }
  addNewEmployee() {
    this.employee.id = 113 + this.i;
    this.employeeService.saveEmployee(this.employee);
    this.i++;
    this.loadEmployee();
  }

  close() {
    if (this.isEditClicked) {
      this.employee = { ...this.tempEmp };
      this.isEditClicked = false;
    }
    else {
      this.loadEmployee();
      this.isEditClicked = false;
    }
    this.display = false;
    this.showInfoTost();
  }
  onDeleteClick(emp) {
    const index = this.employees.indexOf(emp);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.employeeService.deleteEmployee(index);
        this.showDeleteTost();
      },
      reject: () => {
        this.showRejectTost();
      }
    });
  }

  showRegisterTost() {
    this.messageService.add({ severity: 'success', summary: 'Registration', detail: 'Employee registered.' });
  }
  showDeleteTost() {
    this.messageService.add({ severity: 'info', summary: 'Delete', detail: 'Record Deleted.' });
  }
  showUpdateTost() {
    this.messageService.add({ severity: 'info', summary: 'Update', detail: 'Record updated.' });
  }
  showInfoTost() {
    this.messageService.add({ severity: 'error', summary: 'Info', detail: 'Registration cancelled.' });
  }
  showRejectTost() {
    this.messageService.add({ severity: 'warn', summary: 'Info', detail: 'You rejected.' });
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
