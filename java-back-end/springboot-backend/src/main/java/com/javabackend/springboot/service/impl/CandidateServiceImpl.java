package com.javabackend.springboot.service.impl;

import java.util.List;

import com.javabackend.springboot.model.Candidate;
import com.javabackend.springboot.repository.EmployeeRepository;
import com.javabackend.springboot.service.CandidateService;
import org.springframework.stereotype.Service;

import com.javabackend.springboot.exception.ResourceNotFoundException;

@Service
public class CandidateServiceImpl implements CandidateService {

	private EmployeeRepository employeeRepository;
	
	public CandidateServiceImpl(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Candidate saveEmployee(Candidate candidate) {
		return employeeRepository.save(candidate);
	}

	@Override
	public List<Candidate> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@Override
	public Candidate getEmployeeById(long id) {
//		Optional<Employee> employee = employeeRepository.findById(id);
//		if(employee.isPresent()) {
//			return employee.get();
//		}else {
//			throw new ResourceNotFoundException("Employee", "Id", id);
//		}
		return employeeRepository.findById(id).orElseThrow(() -> 
						new ResourceNotFoundException("Employee", "Id", id));
		
	}

	@Override
	public Candidate updateEmployee(Candidate candidate, long id) {
		
		// we need to check whether employee with given id is exist in DB or not
		Candidate existingCandidate = employeeRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Employee", "Id", id)); 
		
		existingCandidate.setUsername(candidate.getUsername());
		existingCandidate.setPassword(candidate.getPassword());
		existingCandidate.setEmail(candidate.getEmail());
		// save existing employee to DB
		employeeRepository.save(existingCandidate);
		return existingCandidate;
	}

	@Override
	public void deleteEmployee(long id) {
		
		// check whether a employee exist in a DB or not
		employeeRepository.findById(id).orElseThrow(() -> 
								new ResourceNotFoundException("Employee", "Id", id));
		employeeRepository.deleteById(id);
	}

	
}
