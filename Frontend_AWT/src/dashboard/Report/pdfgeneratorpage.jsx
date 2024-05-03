import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    paddingBottom: 10,
    flexDirection: "column", // Change to column layout
    alignItems: "center", // Center items horizontally
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Center the text
  },
  metadata: {
    flexDirection: "row", // Change to row layout
    justifyContent: "space-between", // Spread items horizontally
    width: "100%", // Ensure the entire width is utilized
    marginTop: 10, // Add some margin from the Interview Report
  },
  metadataText: {
    fontSize: 12,
    color: "black",
  },
  averageScoreContainer: {
    backgroundColor: "blue", // Changed background color to blue
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  averageScoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // Changed text color to white
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  question: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "900",
    width: "80%",
  },
  answer: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 1.4,
    width: "80%",
  },
  scoreContainer: {
    margin: 20,
    backgroundColor: "green",
    borderRadius: "50%",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 14,
    color: "white",
  },
  score: {
    fontSize: 10,
    fontStyle: "italic",
  },
  bestOfLuck: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    color: "gray",
  },
  metadatascore: {
    color: "black",
    textAlign: "right",
    marginRight: "20px",
  },
});

// Static data for questions, answers, and scores

const PdfDocument = ({ data, subjectName, interviewId, scores }) => {
  const totalScores = scores.reduce((total, score) => total + score, 0);
  const averageScore = (totalScores / scores.length).toFixed(2);
  data.forEach(({ question, answer }, index) => {
    console.log(`Question: ${question}`);
    console.log(`Answer: ${answer}`);
  });
  console.log(averageScore);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Interview Report</Text>
          <View style={styles.metadata}>
            <View>
              <Text style={styles.metadataText}>
                Subject Name: {subjectName}
              </Text>
              <Text style={styles.metadataText}>
                Interview ID:{interviewId}
              </Text>
            </View>
            <View style={styles.averageScoreContainer}>
              {" "}
              <Text style={styles.averageScoreText}>
                Average Score: {averageScore}%
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.metadatascore}>Scores</Text>
        </View>

        {data.map(({ question, answer }, index) => (
          <View key={index} style={styles.section}>
            <View>
              <Text style={styles.question}>{`Q${
                index + 1
              }: ${question}`}</Text>
              <Text style={styles.answer}>{`Answer: ${answer}`}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}> {scores[index]} </Text>{" "}
              {/* Static score */}
            </View>
          </View>
        ))}

        <Text style={styles.bestOfLuck}>Best of luck!</Text>
      </Page>
    </Document>
  );
};
export default PdfDocument;
