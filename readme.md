## 1. What is the difference between `var`, `let`, and `const`?

- `var`
  - Can be re-declared and updated.
- `let`
  - Block-scoped .
  - Can be updated, but not re-declared in the same scope.
- `const`
  - Block-scoped.
  - Cannot be updated or re-declared in the same scope.

## 2. What is the spread operator (`...`)?

- Syntax: `...` (three dots).
- Copies iterable values (arrays, strings, objects) by spreading contents.
- Examples:
  - Array merge: `[...arr1, ...arr2]`
  - Object clone: `{...obj}`
  - Function args: `fn(...args)`

## 3. What is the difference between `map()`, `filter()`, and `forEach()`?

- `map()`
  - Returns a new array with the results of calling a function on every element.
  - Does not modify original array.
- `filter()`
  - Returns a new array containing elements that pass a test function.
  - Does not modify original array.
- `forEach()`
  - Executes a function on each element.
## 4. What is an arrow function?

- Concise syntax for function expressions using `=>`.
- Example: `const add = (a, b) => a + b;`

## 5. What are template literals?

- String literals using backticks (`` ` ``) instead of quotes.
- Support interpolation: `` `Hello, ${name}!` ``.
- Support multi-line strings without `\n`.
