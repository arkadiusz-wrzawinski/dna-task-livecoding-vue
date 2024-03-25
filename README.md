# How should I start
1. Clone the repository
1. `npm install`
1. Run `json-server` to have mocked api (`npm run api`)
1. Check if application is starting (`npm run dev`).
    1. Make sure you use Node 18

## Scenario

Let's imagine that you are working on the frontend for the festival system discussed during teamtask part of the interview.
You have a mock api that has the following endpoints:
- `/merchants` returning all merchants
- `/transactions` returning all transactions

Currently implemented is a really simple dashboard that shows statistics for transactions and registered merchants.

## Task 1
Please make a code review of the currently implemented solution.

## Task 2
Add new page that allows filtering by period and merchant to show:
- amount of transactions in selected period
- amount of revenue in selected period
- list of transactions for a selected merchant

On the list there could be an option to click on the transaction to display transaction details.
Going back to merchant view all preselected options should be preserved.

## After task 2
### Clarifications
These are questions about requirements or assumptions that have been made:
- Should filtering by period and by merchants on the `/transactions` page stay separated or should it be combined?
- Should the transactions list be paginated?
- Should the transactions list be sorted in any way?
- Should the merchants filter allow selecting multiple merchants? (This has been already implemented in the code, it requires a `selectMany` prop to be added to the `DropdownInput` component in `TransactionListView.vue` component)
- Is table a valid way to display the transactions list or should it be displayed in a different way? (I assumed that table would be correct as it's one of the most common ways to display this type of data)
- What are the target browsers for this application? Do we need to drop some implementations that are not supported by older browsers?

### Improvements
These are improvements that could be made to the current implementation:
- Add a loading spinner when the data is being fetched
- Add better, prettier error handling
- Experiment with data refetching strategies (e.g. timing of the refetching, refetching on user action, etc.)
- Improve test coverage
- Add E2E tests (e.g. using Cypress or Playwright)
- Add schema validation for the API responses (e.g. using `zod`)
- Make the app responsive
- Add custom time picker for the period filter
- Improve accessibility (e.g. add aria labels, improve keyboard navigation, etc.)


## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
Open [http://localhost:3000](http://localhost:8000) to view available api endpoints.

### `npm run test:unit`

Run the test cases.
