package com.javabackend.springboot.service;

import java.util.List;

import com.javabackend.springboot.model.Candidate;

public interface CandidateService {
	Candidate saveEmployee(Candidate candidate);
	List<Candidate> getAllEmployees();
	Candidate getEmployeeById(long id);
	Candidate updateEmployee(Candidate candidate, long id);

	  
	void deleteEmployee(long id);
}
