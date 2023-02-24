# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

When reviewing the code file I noticed a few things I wanted to address right away. First, I wanted to use modules, so I reconfigured `jest` to use modules so we could use the `export` and `import` model. Next I noticed that `const` declarations were inside the function, but I found that unnecessary, so I moved them out to the file level instead. I then noticed that we could do an early return on the `event` and get rid of two "wrapper" branches for `event` and `candidate`. After that I moved the `JSON.stringify` of the `candidate` to the only relevant location (when sending in an `event.partitionKey`) so it wasn't executed every time, and lastly, to prevent a wasted memory write operation, I got rid of the branch for `candidate` length and just made it the return statement.
