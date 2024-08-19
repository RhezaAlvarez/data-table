package com.example.data_table_be.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.data_table_be.model.Employee;
import com.example.data_table_be.repository.EmployeeRepo;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;

    public List<Employee> getEmployees() {
        return employeeRepo.findAll();
    }

    public void createEmployees(List<Employee> employees) {
        employeeRepo.saveAll(employees);
    }

    public void updateEmployees(List<Employee> employees) {
        employeeRepo.saveAll(employees);
    }

    public void deleteEmployees(List<Long> ids) {
        employeeRepo.deleteAllById(ids);
    }
}
