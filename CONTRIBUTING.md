# Come one, come all, with contributions great and small!

### Let's get you onto our growing list of contributors!

>First off, thank you for considering contributing to the Energy Price News API. It's people like you that make this thing such a great tool.

## Contributing to the project.

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue, assessing
changes, and helping you finalize your pull requests.

As for everything else in the project, the contributions to Energy-Price-News-API are governed by our [Code of Conduct](https://github.com/Energy-Price-News-API/energy-prices-api/blob/master/CODE_OF_CONDUCT.md).

### What kinds of contributions we are looking for.

We keep an open mind! Improving documentation, bug triaging, or writing tutorials are all examples of helpful contributions for both the users of this tool **and** future contributors.

## Your First Contribution

The aim for this project it to be very easy to access, so please have a look through the [issues](https://github.com/Energy-Price-News-API/energy-prices-api/issues) listed to see if any suit your current or desired skills. The maintainers of the project will try to keep it all as up-to-date as possible.

I would like to encourage contributions of any kind to this project:

- Issues:
  - Suggestions on how to do something
  - Problems/bugs found in the code
  - Ideas for features
  - Discussion around best practices so that others can learn from your experience/knowledge
- Pull Requests
  - Should you have a feature you'd like to share already coded, please submit a detailed pull request
  - A preferred PR format is not yet defined, so we ask you just use common sense and include the type of info you'd like to see as a maintainer
- Documentation
  - Spellchecking and typo corrections are **ALWAYS** welcome :joy:, seriously, I hate typos but make them frequently!
  - Further detail. If you feel something needs to be expanded on, please do so and submit your PR.
  - Wiki: If we get to a point that a wiki would be helpful, please open an issue/discussion with your suggestions
  - As the project grows, this `CONTRIBUTING.md` file will need updating, so add to it where you see fit.
- Share what you do
  - In order to encourage others to join in, feel free to share what you have done on your social media/websites
  - If you know someone that has done something similar, please show them this project as their input would be greatly appreciated

# Getting started
### A quick walkthrough of how to submit a contribution.

For something that is bigger than a one or two line fix:
1. Create your own fork of the code [(detailed below)](#how-to-make-a-fork)
2. Do the changes in your fork
3. If you like the change and think the project could use it:
    * Try to follow the code style for the project
    * Note our Code of Conduct.
    * Try to follow [our commit message style](#commit-message-style)
    * Send a pull request.

> **Note**
> For instructions on getting up and running please give the [README.md](https://github.com/Energy-Price-News-API/energy-prices-api/) a quick read.

>At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile_cat:
>
>If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

## How to make a fork

**1.** Start by making a Fork of the project repository. Click on the <a href="https://github.com/Energy-Price-News-API/energy-prices-api/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a>Fork symbol at the top right corner.

**2.** Clone your new fork of the repository in the terminal/CLI on your computer with the following command:

```bash
git clone https://github.com/<your-github-username>/energy-prices-api
```

**3.** Navigate to the newly created energy-prices-api project directory:

```bash
cd energy-prices-api
```

**4.** Set upstream command:

```bash
git remote add upstream https://github.com/Energy-Price-News-API/energy-prices-api.git
```

**5.** Create a new branch:

```bash
git checkout -b <your-branch-name>
```

**6.** Sync your fork or your local repository with the origin repository:

- In your forked repository, click on "Fetch upstream"
- Click "Fetch and merge"

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes:

⚠️ **Make sure** not to commit `package.json` or `package-lock.json` file

⚠️ **Make sure** not to run the commands `git add .` or `git add *`

> Instead, stage your changes for each file/folder
>
> By using public path it means it will add all files and folders under that folder, it is better to be specific
```bash
git add public
```

_or_

```bash
git add "<files_you_have_changed>"
```

**9.** Commit your changes:

```bash
git commit -m "<your_commit_message>"
```

**10.** Push your local commits to the remote repository:

```bash
git push origin <your-branch-name>
```

**11.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**12.** **Congratulations!** You've made your first contribution! 🙌🏼

[source: EddieHubCommunity - LinkFree](https://github.com/EddieHubCommunity/LinkFree/blob/main/CONTRIBUTING.md?plain=1)

## Commit message style

To try and keep thinks running as smoothly as possible, we ask that you do your best to stick to conventional commit messages.

[Full details can be found here](https://www.conventionalcommits.org/en/v1.0.0/#summary)

**TLDR**: 
- be descriptive but concise
- reference the issue addressed by ID
- mention fix/feat/doc or whatever applies

## If you have a small or "obvious" fix, you may also...

Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a patch, without a CLA.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:
* Spelling / grammar fixes
* Typo correction, white space and formatting changes
* Comment clean up

# How to report a bug or request a feature or documentation
Please use the issue templates [found in the issues tab](https://github.com/Energy-Price-News-API/energy-prices-api/issues) and fill out the various sections. The more detail you can provide, the better!

## Code review process
This project is currently maintained by only two developers that volunteer their free time between work and family. They're both passionate about the project and try to stay as up-to-date as possible but sometimes will not be available immediately. Please do not be discouraged if your question or PR is not addressed within 24-48 hours, we **WILL** answer everything as fast as we possibly can.

Any and all contributions are greatly appreciated and encouraged because the **main** aim of this project is for us all to learn about various aspects of this huge world of web development.

### Finally
Thanks very much for your consideration of this project and for taking the time to read through this document.

Yours

Sam
