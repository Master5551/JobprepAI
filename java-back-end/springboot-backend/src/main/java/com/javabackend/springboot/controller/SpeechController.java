package com.javabackend.springboot.controller;

import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3003")
public class SpeechController {

    @PostMapping("/summary")
    public String process(@RequestBody Map<String, Object> jsonData) {
        try {
            String subjectName = (String) jsonData.get("subject_name");
            List<Map<String, String>> transcripts = (List<Map<String, String>>) jsonData.get("transcripts");

            for (Map<String, String> transcript : transcripts) {
                Long id = Long.parseLong(transcript.get("id"));
                String inputText = transcript.get("transcript");

                System.out.println("Processing transcript with ID: " + id);
                System.out.println("Transcript Text: " + inputText);

                String expectedAnswer = fetchDataFromDatabase(id, subjectName);
                System.out.println("Expected Answer: " + expectedAnswer);

                if (expectedAnswer != null) {
                    String pythonScript = "F:/Projects/JobPrepAI/AJ_API/spring-boot-tutorial-course/springboot-backend/1.py";
                    System.out.println("Calling Python script: " + pythonScript);
                    ProcessBuilder pb = new ProcessBuilder("python", pythonScript, expectedAnswer, inputText);
                    Process process = pb.start();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    StringBuilder output = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        output.append(line).append("\n");
                    }

                    int exitCode = process.waitFor();
                    if (exitCode == 0) {
                        System.out.println("Python script executed successfully");
                        System.out.println("Score: " + output.toString());
                    } else {
                        System.out.println("Error: Python script execution failed");
                    }
                } else {
                    System.out.println("Error: Expected answer not found in the database");
                }
            }
            return "Processing complete";

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            System.out.println("Error: Exception occurred");
            return "Error: Exception occurred";
        }
    }

    private String fetchDataFromDatabase(Long id, String subjectName) {
        String url = "jdbc:mysql://Localhost:3306/jobprepai";
        String username = "root";
        String password = "";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String query = "SELECT expected_answer FROM " + subjectName + " WHERE id = ?";
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setLong(1, id);
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        return resultSet.getString("expected_answer");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
