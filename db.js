// const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL
// const connectDB = () => {
//   return mongoose.connect(uri, ()=>{
//     console.log("Connected");
//   })
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(MONGO_URL, {})
    .then(() => {
      console.log("Connected to Mongo successful");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
module.exports = connectDB;

// {
//   "questions": [
//       {
//           "title": "Maximum Depth of Binary Tree",
//           "links": [
//               "https://leetcode.com/problems/maximum-depth-of-binary-tree"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Roman to Integer",
//           "links": [
//               "https://leetcode.com/problems/roman-to-integer"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Two Sum",
//           "links": [
//               "https://leetcode.com/problems/two-sum"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Symmetric Tree",
//           "links": [
//               "https://leetcode.com/problems/symmetric-tree"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Majority Element",
//           "links": [
//               "https://leetcode.com/problems/majority-element"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Contains Duplicate II",
//           "links": [
//               "https://leetcode.com/problems/contains-duplicate-ii"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Find the Index of the First Occurrence in a String",
//           "links": [
//               "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Binary Tree Preorder Traversal",
//           "links": [
//               "https://leetcode.com/problems/binary-tree-preorder-traversal"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Same Tree",
//           "links": [
//               "https://leetcode.com/problems/same-tree"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Palindrome Number",
//           "links": [
//               "https://leetcode.com/problems/palindrome-number"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Missing Ranges",
//           "links": [
//               "https://leetcode.com/problems/missing-ranges"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Binary Tree Inorder Traversal",
//           "links": [
//               "https://leetcode.com/problems/binary-tree-inorder-traversal"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Climbing Stairs",
//           "links": [
//               "https://leetcode.com/problems/climbing-stairs"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Linked List Cycle",
//           "links": [
//               "https://leetcode.com/problems/linked-list-cycle"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Combine Two Tables",
//           "links": [
//               "https://leetcode.com/problems/combine-two-tables"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Implement Stack using Queues",
//           "links": [
//               "https://leetcode.com/problems/implement-stack-using-queues"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Power of Two",
//           "links": [
//               "https://leetcode.com/problems/power-of-two"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Implement Queue using Stacks",
//           "links": [
//               "https://leetcode.com/problems/implement-queue-using-stacks"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       },
//       {
//           "title": "Power of Four",
//           "links": [
//               "https://leetcode.com/problems/power-of-four"
//           ],
//           "topicId": ["64fd6d97d0d3a64383d9f6e8"]
         
//       }
//   ]
// }