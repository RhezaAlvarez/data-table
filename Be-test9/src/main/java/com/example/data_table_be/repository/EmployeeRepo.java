package com.example.data_table_be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.data_table_be.model.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
    
}
