package com.example.data_table_be.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.data_table_be.model.Employee;
import com.example.data_table_be.service.EmployeeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Employee>> getAll(){
        List<Employee> response = employeeService.getEmployees();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<List<Employee>> createEmployeesBulk(@RequestBody List<Employee> employees) {
        employeeService.createEmployees(employees);
        List<Employee> response = employeeService.getEmployees();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<List<Employee>> updateEmployeesBulk(@RequestBody List<Employee> employees) {
        employeeService.updateEmployees(employees);
        List<Employee> response = employeeService.getEmployees();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<List<Employee>> deleteEmployeesBulk(@RequestBody List<Long> ids) {
        employeeService.deleteEmployees(ids);
        List<Employee> response = employeeService.getEmployees();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
