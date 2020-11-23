---
title: Setting up a Pull Request template on Github
date: 2020-11-23
tags: ["github"]
layout: layouts/post.njk
---

A [Pull Request template](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository) auto-populates the body field when making a Pull Request.  It provides the perfect place to:

- Guide new contributors through the PR process e.g. Links to contribution guidelines and instructions about how to look for similar PRs that already exist.
- Make expectations clear regarding what information is needed for a PR e.g. Screenshots or videos of new UI functionality.
- Give a checklist of often forgotten tasks related to the PR e.g. Linting and formatting of code.

GitHub makes it easy to add your own markdown based template to a project. You create a `.github` directory in the root of the project and within that directory create a file named `pull_request_template.md`. This file will now be automatically picked up and used for PRs.

 At [Full Facing](https://www.fullfacing.com/) we use a fairly simple template which meets our needs:

```markdown
## Description

Brief description of changes made e.g. bug fix for broken Ajax container.

## Related tickets

Any Jira tickets related to the changes.

## Types of changes

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Checklist

- [ ] I have lint my changes locally.
- [ ] I have formatted my changes locally.
- [ ] I have updated any relevant documentation.
- [ ] I have added tests to cover my changes.
- [ ] I have checked that all new and existing tests passed.
- [ ] I have checked to ensure there aren't other open Pull Requests for the same update/change.
```

You can customize the template to match your own preferences and there are [numerous examples available on Github](https://github.com/search?q=pull+request+template).
