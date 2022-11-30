# Contributing

Thanks for contributing! We are actively looking for people who want to get started contributing to Open Source. Please feel free to open issues with questions or ask for clarification.

Documentation for contributing can be found in the [contributing-guides folder](./contributing-guides).  If you are new to React Test a "Getting Started" guide follows.
If you are looking for specific [How-To's](./contributing-guides/how-to), [Referece Docs](./contributing-guides/reference) or [In-Depth Explanations](./contributing-guides/explanations) check-out the corresponding folder our contributing guides.

[_ToC_]

# Getting Started
Contributing to React Test is a pretty simple process.
1. [Clone the repository](#cloning-react-test)
2. Find something to work on in the Issues tab and [Claim an issue](#finding-an-issue)
3. [Write an implementation](#writing-code) that satisfies the requirements outlined in that issue
4. [Initiate a Pull Request](#merging-your-contribution) from your branch 


## Cloning React Test
To get started contributing, first you have to get the repo working in your computer:

- Clone the repository: `git clone git://github.com/franciscop/react-test.git && cd ./react-test`
- Install the dependencies: `npm install`
- Start watching the tests `npm start`
- Modify any file within `/src` (code, tests or documentation)

After these steps, the library, tests and documentation will be automatically built each time a change is saved. Please try not to make a PR with broken tests.

## Finding an Issue

This project organizes To-Do items using the [Issues tab in Github](https://github.com/franciscop/react-test/issues). Please contribute to any of those, on a first come first served basis.

To allow for more people to get started as contributors, please limit your contributions to **2 methods**. If you want more, please feel free to open an issue and I can give some slightly more difficult tasks.

You can follow some of the existing methods in src/[METHOD]. We'd recommended to copy one of the existing ones and modify the files to have a base to get started, like `.children()`.

## Writing Code
1. Create a local branch of the repository (alternatively you could use the "fork" menu to create your own copy of the repository)
2. Copy an existing component folder (such as '.children()') from the existing modules in /src
3. Rename the folder to match the name defined in the Issue you took from the Issues tab in Github.
4. Write your implementation in the "index.js" file
5. Document your implementation in the "readme.md" file
6. Write tests for your function in the "test.js" file (More info on writing tests in the [Testing How-To](./contributing-guides/how-tos/Testing.md))

## Merging Your Contribution
If you forked your own version of the repository, you will be able to make a Pull Request from your fork to the main fork.  If you create a local branch from the main repository, you may need to get permission from the repository owner in order to push your changes to your branch on origin.
Once your branch is pushed to origin (or main in your fork) you can initiate a pull request.  To do so simply go to the Pull Requests tab in Github and click "New Pull Request".  Make a request to merge your branch to main and make sure to link the Issue you claimed in the PR description.  The project owner will review the PR.  Keep an eye out for feedback/comments on your PR to know if you need to make additional changes to allow your contribution to merge. 

