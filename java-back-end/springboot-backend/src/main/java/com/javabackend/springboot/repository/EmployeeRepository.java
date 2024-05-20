package com.javabackend.springboot.repository;

import com.javabackend.springboot.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Candidate, Long>{
    Optional<Candidate> findByEmail(String email);
}
