-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 10:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobprepai`
--

-- --------------------------------------------------------

--
-- Table structure for table `algorithms`
--

CREATE TABLE `algorithms` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `expected_answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `algorithms`
--

INSERT INTO `algorithms` (`id`, `question`, `expected_answer`) VALUES
(1, 'What is an algorithm?', 'An algorithm is a step-by-step procedure or set of instructions designed to solve a specific problem.'),
(2, 'What is the time complexity of linear search?', 'O(n)'),
(3, 'What is the time complexity of binary search?', 'O(log n)'),
(4, 'What is bubble sort?', 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'),
(5, 'What is a linked list?', 'A linked list is a linear data structure consisting of a sequence of elements where each element points to the next element in the sequence.'),
(6, 'What is the difference between an array and a linked list?', 'An array stores elements in contiguous memory locations, while a linked list stores elements in nodes that may be scattered throughout memory and are connected via pointers.'),
(7, 'What is recursion?', 'Recursion is a programming technique where a function calls itself in order to solve a smaller instance of the same problem.'),
(8, 'What is dynamic programming?', 'Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and solving each subproblem only once, storing the solutions to subproblems in a table to avoid redundant computations.'),
(9, 'What is the difference between depth-first search (DFS) and breadth-first search (BFS)?', 'DFS explores as far as possible along each branch before backtracking, while BFS explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth.'),
(10, 'What is the difference between a stack and a queue?', 'A stack is a data structure that follows the Last In, First Out (LIFO) principle, while a queue follows the First In, First Out (FIFO) principle.'),
(11, 'Explain the divide and conquer strategy.', 'Divide and conquer is an algorithmic paradigm where a problem is divided into smaller subproblems of the same type, conquered by solving each subproblem independently, and then combining the solutions to the subproblems to form the solution to the original problem.'),
(12, 'What is a heap?', 'A heap is a specialized tree-based data structure that satisfies the heap property, where each parent node is greater than or equal to its child nodes (max heap) or less than or equal to its child nodes (min heap).'),
(13, 'What is memoization?', 'Memoization is an optimization technique used in dynamic programming where the results of expensive function calls are stored and reused when the same inputs occur again.'),
(14, 'Explain the concept of greedy algorithms.', 'Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum solution. They do not always produce the optimal solution but often produce a solution that is close to optimal.'),
(15, 'What is the traveling salesman problem (TSP)?', 'The traveling salesman problem is a classic optimization problem where the objective is to find the shortest possible route that visits each city exactly once and returns to the origin city.'),
(16, 'What is big O notation?', 'Big O notation is used to describe the upper bound of the growth rate of an algorithm in terms of the input size. It represents the worst-case scenario in terms of time complexity.'),
(17, 'What is a priority queue?', 'A priority queue is a data structure that stores elements along with their associated priorities and supports operations such as insertion and deletion of elements based on their priority.'),
(18, 'Explain the concept of backtracking.', 'Backtracking is a technique used to solve problems recursively by trying to build a solution incrementally and abandoning the partial solutions that cannot fulfill the conditions of the problem at any point.'),
(19, 'What is the time complexity of quicksort?', 'The average-case time complexity of quicksort is O(n log n), while the worst-case time complexity is O(n^2).'),
(20, 'What is the difference between Dijkstra\'s algorithm and Bellman-Ford algorithm?', 'Dijkstra\'s algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights, while Bellman-Ford algorithm can handle graphs with negative edge weights but may not always find the shortest path.'),
(21, 'What is NP-hardness?', 'NP-hardness is a classification of computational problems indicating that a problem is at least as hard as the hardest problems in NP, meaning there is no known polynomial-time algorithm to solve it.'),
(22, 'Explain the concept of NP-completeness.', 'NP-completeness is a class of decision problems that are both in NP (nondeterministic polynomial time) and are at least as hard as the hardest problems in NP. A problem is NP-complete if it is in NP and every problem in NP can be reduced to it in polynomial time.'),
(23, 'What is the time complexity of the Floyd-Warshall algorithm?', 'The time complexity of the Floyd-Warshall algorithm is O(V^3), where V is the number of vertices in the graph.'),
(24, 'Explain the concept of parallel algorithms.', 'Parallel algorithms are algorithms designed to execute multiple instructions simultaneously, taking advantage of parallel processing capabilities of modern computer architectures to improve performance.'),
(25, 'What is the difference between a deterministic algorithm and a randomized algorithm?', 'A deterministic algorithm always produces the same output for a given input, while a randomized algorithm may produce different outputs for the same input due to the use of randomness.'),
(26, 'What is the time complexity of the A* search algorithm?', 'The time complexity of the A* search algorithm depends on the heuristic function used, but in the worst case, it can be exponential. However, with an admissible and consistent heuristic, it typically performs well in practice.'),
(27, 'Explain the concept of approximation algorithms.', 'Approximation algorithms are algorithms designed to find near-optimal solutions for optimization problems where finding an exact solution is computationally infeasible.'),
(28, 'What is the P vs NP problem?', 'The P vs NP problem is one of the most important unsolved problems in computer science, asking whether every problem whose solution can be quickly verified by a computer can also be quickly solved by a computer.'),
(29, 'What is the time complexity of the Rabin-Karp string matching algorithm?', 'The Rabin-Karp string matching algorithm has an average-case time complexity of O(n+m), where n is the length of the text and m is the length of the pattern, but it can have a worst-case time complexity of O(n*m) if hash collisions occur frequently.'),
(30, 'Explain the concept of quantum algorithms.', 'Quantum algorithms are algorithms designed to run on quantum computers, taking advantage of the principles of quantum mechanics such as superposition and entanglement to perform computations more efficiently than classical algorithms.');

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `email`, `password`, `username`) VALUES
(1, 'jay@gmail.com', 'jay134', 'jay'),
(2, 'csgotester45@gmail.com', '123', 'Jay sharma'),
(3, 'hasti.hajipara@gmail.com', 'Hasti@522004', 'Hasti hajipara'),
(4, 'hasti.hajipara@gmail.com', 'Hasti@522004', 'Hasti hajipara');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`) VALUES
(1, 'What is data structure'),
(2, 'What is algrorithms'),
(3, 'What is JavaScript?'),
(4, 'How do you declare a variable in JavaScript?'),
(5, 'What are the data types in JavaScript?'),
(6, 'What is the difference between == and === in JavaScript?'),
(7, 'How do you check the type of a variable in JavaScript?'),
(8, 'What is the purpose of the \"use strict\" directive in JavaScript?'),
(9, 'What are the different types of loops in JavaScript?'),
(10, 'What is the DOM in JavaScript?'),
(11, 'How do you create an object in JavaScript?'),
(12, 'What is closure in JavaScript?'),
(13, 'What is event bubbling and capturing in JavaScript?'),
(14, 'What is AJAX in JavaScript?'),
(15, 'What is a promise in JavaScript?'),
(16, 'What are the different methods of handling asynchronous operations in JavaScript?'),
(17, 'How do you handle errors in JavaScript?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `algorithms`
--
ALTER TABLE `algorithms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `algorithms`
--
ALTER TABLE `algorithms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
