package com.javabackend.springboot.controller;

import java.util.List;

import com.javabackend.springboot.model.Candidate;
import com.javabackend.springboot.service.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3003")
@RequestMapping("/api/candidate")
public class CandidateController {

	private CandidateService candidateService;

	public CandidateController(CandidateService candidateService) {
		super();
		this.candidateService = candidateService;
	}

	// build create employee REST API
	@PostMapping("/insert")
	public ResponseEntity<Candidate> saveEmployee(@RequestBody Candidate candidate){
		return new ResponseEntity<Candidate>(candidateService.saveEmployee(candidate), HttpStatus.CREATED);
	}

	// build get all employees REST API
	@GetMapping
	public List<Candidate> getAllEmployees(){
		return candidateService.getAllEmployees();
	}

	// build get employee by id REST API
	// http://localhost:8080/api/employees/1

		public ResponseEntity<Candidate> getEmployeeById(@PathVariable("id") long employeeId){
		return new ResponseEntity<Candidate>(candidateService.getEmployeeById(employeeId), HttpStatus.OK);
	}

	// build update employee REST API
	// http://localhost:8080/api/employees/1
	@PutMapping("{id}")
	public ResponseEntity<Candidate> updateEmployee(@PathVariable("id") long id
												  , @RequestBody Candidate candidate){
		return new ResponseEntity<Candidate>(candidateService.updateEmployee(candidate, id), HttpStatus.OK);
	}

	// build delete employee REST API
	// http://localhost:8080/api/employees/1
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id){

		// delete employee from DB
		candidateService.deleteEmployee(id);

		return new ResponseEntity<String>("Employee deleted successfully!.", HttpStatus.OK);
	}


}
