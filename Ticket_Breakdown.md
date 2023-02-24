# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Add `CustomId` to the `Agents` table

The `Agents` table needs a new field for `CustomId` that clients can use. This should be a `varchar(16)` field and should default to `NULL`.

### Modify the report query to return the new custom ID

The report query needs modified to pull back the new `CustomId` field from the `Agents` table when aggregating data. We can do this two ways:

1. Bring the value back into its own field and handle the coalesce in the report generation.
2. Coalesce the new field into the original `Id` field so that there remains a single `Id` field.

I prefer the second option because it requires no change to the reporting mechanism. However, if we choose the first option, the ticket to change the report would be required.

### Modify the report generation to display the new field IF there is a value

If we chose to bring the new `CustomId` field back into its own field in the query, we need to modify the report to display the new `CustomId` field _if_ a value exists. If no value exists we fallback to the system generated `Id` field.

### Perform functional testing in staging

1. Add some test data to staging for the `CustomId` field for a few agents.
2. Run the report.
3. Verify the agents that have a `CustomId` show that ID.
4. Verify the agents that _do not_ have a `CustomId` show the system generated `Id`.
