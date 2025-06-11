# strack-your-progress-cli

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Create a new goal

The project uses `sqlite` as a local database to store your goals and other information. You can create a new goal with the following command:

```bash
bun run index.ts create-goal "name of goal" 10
```

The first argument, `create-goal` is the command that tells to the cli to create a new goal. The next command is the name of the `goal` (it can only be 20 characters). The last argument is the `target`. The `target` is the number of times you have to do to reach the goal.

# Show goals

View the progress of all target bars with the following command:

```bash
bun run index.ts show-goals
```

Something like will be printed on console:

```bash
sleep until 00:00   ████████████████████████████████████████ 0.00  % | 0/31
```

# Deleting

You can to delete a goal with your name. It's very simple:

```bash
bun run index.ts delete-goal "test"
```

The goal `test` will be deleted. Of course, you will write the name of goal you want to delete.

# Add failures

The capacity to incorporate failures into a goal is a distinct possibility.  The addition of a failure results in a reset of the progress, while the goal itself remains intact. The quantity of failures will be documented, along with the date of the most recent failure. These registers are intended for incorporation into subsequent versions, in which they will be utilized for the purpose of implementing new features. At present, the progress is merely reset.

```bash
bun run index.ts add-failure test
```

The `test` will be reset and the `failure` column incremented in `1`.

# Updating a goal

You can increment the progress of goal in `1` with the following command:

```bash
bun run index.ts update-goal test
```

When you view the bar, the data will be updated.
