
import mongoose from 'mongoose';
import { ProblemModel } from './models/problem.js'; // Adjust path as necessary
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const defaultProblems = [
  {
  "name": "Print Given String",
  "statement": "Write a function that takes a single string input from the user and prints it exactly as it is. This function should handle different types of strings, including those with special characters, spaces, and punctuation.",
  "sampleInput": "s = 'user input'",
  "sampleOutput": "user input",
  "difficulty": "Easy",
  "testCases": [
    { "input": "s = 'user input'", "output": "user input" },
    { "input": "s = 'hello world'", "output": "hello world" },
    { "input": "s = 'example string'", "output": "example string" },
    { "input": "s = 'print this'", "output": "print this" },
    { "input": "s = 'DSA problems'", "output": "DSA problems" },
    { "input": "s = 'simple test'", "output": "simple test" },
    { "input": "s = 'code sample'", "output": "code sample" }
  ],
  "public": true

  },
  {
    "name": "Print Characters of a String",
    "statement": "Create a function that takes a string and prints each character on a new line. This function should iterate through the string, ensuring each character, including whitespace and special symbols, is printed individually on separate lines.",
    "sampleInput": "s = 'hello'",
    "sampleOutput": "h\ne\nl\nl\no",
    "difficulty": "Easy",
    "testCases": [
      { "input": "s = 'hello'", "output": "h\ne\nl\nl\no" },
      { "input": "s = 'world'", "output": "w\no\nr\nl\nd" },
      { "input": "s = 'abc'", "output": "a\nb\nc" },
      { "input": "s = '123'", "output": "1\n2\n3" },
      { "input": "s = 'test'", "output": "t\ne\ns\nt" },
      { "input": "s = 'string'", "output": "s\nt\nr\ni\nn\ng" },
      { "input": "s = 'a'", "output": "a" }
    ],
    "public": true
  },
  {
    "name": "Count Vowels in a String",
    "statement": "Develop a function that counts and returns the number of vowels in a given string. Vowels are defined as 'a', 'e', 'i', 'o', and 'u', and the function should be able to handle both uppercase and lowercase vowels. The function should efficiently tally the occurrences of these vowels in the string.",
    "sampleInput": "s = 'hello'",
    "sampleOutput": "2",
    "difficulty": "Easy",
    "testCases": [
      { "input": "s = 'hello'", "output": "2" },
      { "input": "s = 'world'", "output": "1" },
      { "input": "s = 'abc'", "output": "2" },
      { "input": "s = 'a string'", "output": "2" },
      { "input": "s = 'test'", "output": "1" },
      { "input": "s = 'abcdefghijklmnopqrstuvwxyz'", "output": "5" },
      { "input": "s = 'rhythm'", "output": "0" }
    ],
    "public": true
  },
  {
    "name": "Check Palindrome",
    "statement": "Implement a function to determine if a given string is a palindrome. A palindrome reads the same forwards and backwards, and the function should check this condition while accounting for case sensitivity and ignoring non-alphabetic characters if necessary.",
    "sampleInput": "s = 'madam'",
    "sampleOutput": "true",
    "difficulty": "Easy",
    "testCases": [
      { "input": "s = 'madam'", "output": "true" },
      { "input": "s = 'racecar'", "output": "true" },
      { "input": "s = 'hello'", "output": "false" },
      { "input": "s = 'level'", "output": "true" },
      { "input": "s = 'world'", "output": "false" },
      { "input": "s = 'a'", "output": "true" },
      { "input": "s = 'abccba'", "output": "true" }
    ],
    "public": true
  },
  {
    "name": "Two Sum",
    "statement": "Write a function that finds two distinct numbers in an array that add up to a given target value. The function should return the indices of these two numbers, and it should handle various array sizes and element values, including both positive and negative integers.",
    "sampleInput": "nums = [2, 7, 11, 15], target = 9",
    "sampleOutput": "[0, 1]",
    "difficulty": "Medium",
    "testCases": [
      { "input": "nums = [2, 7, 11, 15], target = 9", "output": "[0, 1]" },
      { "input": "nums = [3, 2, 4], target = 6", "output": "[1, 2]" },
      { "input": "nums = [3, 3], target = 6", "output": "[0, 1]" },
      { "input": "nums = [1, 5, 9, 12], target = 14", "output": "[1, 2]" },
      { "input": "nums = [1, 2, 3, 4, 5], target = 7", "output": "[1, 4]" },
      { "input": "nums = [-1, 0, 1, 2], target = 1", "output": "[0, 2]" },
      { "input": "nums = [0, 0, 0, 0], target = 0", "output": "[0, 1]" }
    ],
    "public": true
  },
  {
    "name": "Reverse String",
    "statement": "Create a function that reverses a string provided as an array of characters. The function should output a new array with the characters in reverse order, ensuring that the reversal operation handles arrays of different lengths and includes special characters.",
    "sampleInput": "s = ['h', 'e', 'l', 'l', 'o']",
    "sampleOutput": "['o', 'l', 'l', 'e', 'h']",
    "difficulty": "Easy",
    "testCases": [
      { "input": "s = ['h', 'e', 'l', 'l', 'o']", "output": "['o', 'l', 'l', 'e', 'h']" },
      { "input": "s = ['H', 'a', 'n', 'n', 'a', 'h']", "output": "['h', 'a', 'n', 'n', 'a', 'H']" },
      { "input": "s = ['a', 'b', 'c']", "output": "['c', 'b', 'a']" },
      { "input": "s = ['r', 'e', 'v', 'e', 'r', 's', 'e']", "output": "['e', 's', 'r', 'e', 'v', 'e', 'r']" },
      { "input": "s = ['t', 'e', 's', 't']", "output": "['t', 's', 'e', 't']" },
      { "input": "s = ['a']", "output": "['a']" },
      { "input": "s = []", "output": "[]" }
    ],
    "public": true
  },
  {
    "name": "Valid Parentheses",
    "statement": "Design a function that checks if a string containing only parentheses characters ('(', ')', '{', '}', '[', ']') is valid. A valid string is one where every opening bracket has a corresponding closing bracket in the correct order and nesting.",
    "sampleInput": "s = '()[]{}'",
    "sampleOutput": "true",
    "difficulty": "Hard",
    "testCases": [
      { "input": "s = '()[]{}'", "output": "true" },
      { "input": "s = '(]', ')", "output": "false" },
      { "input": "s = '([)]'", "output": "false" },
      { "input": "s = '([])'", "output": "true" },
      { "input": "s = '[({})]'", "output": "true" },
      { "input": "s = '((((((('", "output": "false" },
      { "input": "s = '')))))))'", "output": "false" }
    ],
    "public": true
  },
  {
    "name": "Merge Two Sorted Lists",
    "statement": "Develop a function to merge two sorted linked lists into a single sorted linked list. The function should combine the nodes from both lists while maintaining the sorted order, and it should be able to handle different lengths of input lists and empty lists.",
    "sampleInput": "l1 = [1, 2, 4], l2 = [1, 3, 4]",
    "sampleOutput": "[1, 1, 2, 3, 4, 4]",
    "difficulty": "Easy",
    "testCases": [
      { "input": "l1 = [1, 2, 4], l2 = [1, 3, 4]", "output": "[1, 1, 2, 3, 4, 4]" },
      { "input": "l1 = [], l2 = [0]", "output": "[0]" },
      { "input": "l1 = [2, 6, 9], l2 = [1, 4, 8]", "output": "[1, 2, 4, 6, 8, 9]" },
      { "input": "l1 = [1, 5], l2 = [2, 3, 6]", "output": "[1, 2, 3, 5, 6]" },
      { "input": "l1 = [1], l2 = [1, 2, 3]", "output": "[1, 1, 2, 3]" },
      { "input": "l1 = [5], l2 = [1, 2, 3, 4, 6]", "output": "[1, 2, 3, 4, 5, 6]" },
      { "input": "l1 = [1, 4, 7], l2 = [2, 5, 8]", "output": "[1, 2, 4, 5, 7, 8]" }
    ],
    "public": true
  },
  {
    "name": "Remove Duplicates from Sorted Array",
    "statement": "Write a function to remove duplicate elements from a sorted array in place. The function should modify the array such that each element appears only once and return the new length of the array. It should efficiently handle the removal of duplicates without using extra space.",
    "sampleInput": "nums = [1, 1, 2]",
    "sampleOutput": "[1, 2]",
    "difficulty": "Hard",
    "testCases": [
      { "input": "nums = [1, 1, 2]", "output": "[1, 2]" },
      { "input": "nums = [0, 0, 1, 1, 1, 2, 2, 3, 3]", "output": "[0, 1, 2, 3]" },
      { "input": "nums = [1, 1, 1, 1, 1]", "output": "[1]" },
      { "input": "nums = [1, 2, 3, 4, 5]", "output": "[1, 2, 3, 4, 5]" },
      { "input": "nums = [1, 1, 2, 2, 2, 3, 4, 4]", "output": "[1, 2, 3, 4]" },
      { "input": "nums = [1, 3, 3, 5, 7, 7, 9]", "output": "[1, 3, 5, 7, 9]" },
      { "input": "nums = [10, 10, 20, 30, 30, 30, 40]", "output": "[10, 20, 30, 40]" }
    ],
    "public": true
  },
  {
    "name": "Implement Stack Using Queues",
    "statement": "Write a function to remove duplicate elements from a sorted array in place. The function should modify the array such that each element appears only once and return the new length of the array. It should efficiently handle the removal of duplicates without using extra space.",
    "sampleInput": "Operations: push(1), push(2), top(), pop(), top()",
    "sampleOutput": "[2, 2]",
    "difficulty": "Medium",
    "testCases": [
      { "input": "Operations: push(1), push(2), top(), pop(), top()", "output": "[2, 2]" },
      { "input": "Operations: push(5), push(10), push(15), pop(), top()", "output": "[15, 10]" },
      { "input": "Operations: push(3), push(4), push(5), pop(), pop(), top()", "output": "[4, 3]" },
      { "input": "Operations: push(7), pop(), top()", "output": "[7]" },
      { "input": "Operations: push(8), pop(), pop(), top()", "output": "[8]" },
      { "input": "Operations: push(2), push(4), push(6), push(8), pop(), top()", "output": "[8, 6]" },
      { "input": "Operations: push(1), push(2), push(3), pop(), push(4), top()", "output": "[4, 4]" }
    ],
    "public": true
  },
  {
    "name": "Rotate Array",
    "statement": "Create a function that rotates an array to the right by a specified number of steps. The rotation should be performed in place, meaning that the function should adjust the array's order without creating a new array.",
    "sampleInput": "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
    "sampleOutput": "[5, 6, 7, 1, 2, 3, 4]",
    "difficulty": "Easy",
    "testCases": [
      { "input": "nums = [1, 2, 3, 4, 5, 6, 7], k = 3", "output": "[5, 6, 7, 1, 2, 3, 4]" },
      { "input": "nums = [-1, -100, 3, 99], k = 2", "output": "[3, 99, -1, -100]" },
      { "input": "nums = [1, 2], k = 1", "output": "[2, 1]" },
      { "input": "nums = [1, 2, 3, 4], k = 4", "output": "[1, 2, 3, 4]" },
      { "input": "nums = [1], k = 0", "output": "[1]" },
      { "input": "nums = [1, 2, 3, 4, 5, 6], k = 2", "output": "[5, 6, 1, 2, 3, 4]" },
      { "input": "nums = [10, 20, 30, 40, 50], k = 3", "output": "[30, 40, 50, 10, 20]" }
    ],
    "public": true
  },
  {
    "name": "Merge Sorted Array",
    "statement": "Write a function to merge two sorted arrays into one sorted array. The function should merge the elements of the second array into the first array, ensuring that the result is sorted, and should handle arrays of different sizes efficiently.",
    "sampleInput": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3",
    "sampleOutput": "[1, 2, 2, 3, 5, 6]",
    "difficulty": "Medium",
    "testCases": [
      { "input": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3", "output": "[1, 2, 2, 3, 5, 6]" },
      { "input": "nums1 = [1], m = 1, nums2 = [], n = 0", "output": "[1]" },
      { "input": "nums1 = [0], m = 0, nums2 = [1], n = 1", "output": "[1]" },
      { "input": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [0, 0, 0], n = 3", "output": "[0, 0, 0, 1, 2, 3]" },
      { "input": "nums1 = [1, 4, 6, 0, 0, 0], m = 3, nums2 = [2, 3, 5], n = 3", "output": "[1, 2, 3, 4, 5, 6]" },
      { "input": "nums1 = [2, 3, 4, 0, 0, 0], m = 3, nums2 = [1, 5, 6], n = 3", "output": "[1, 2, 3, 4, 5, 6]" },
      { "input": "nums1 = [1, 1, 1, 0, 0, 0], m = 3, nums2 = [2, 2, 2], n = 3", "output": "[1, 1, 1, 2, 2, 2]" }
    ],
    "public": true
  }
];

const addDefaultProblems = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await ProblemModel.insertMany(defaultProblems);
    console.log('Default problems added successfully!');
  } catch (err) {
    console.error('Error adding default problems:', err);
  }finally {
    mongoose.connection.close();
  }
};

addDefaultProblems();
