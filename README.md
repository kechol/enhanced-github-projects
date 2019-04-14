![EGP](https://raw.githubusercontent.com/kechol/enhanced-github-projects/master/src/icon.png)

# Enhanced Github Projects

A chrome extension to enhance your GitHub Projects.

## Features

### Import issues to each column via search results

![Import issues](https://raw.githubusercontent.com/kechol/enhanced-github-projects/master/misc/images/import-issues.gif)

You can import issues to a column via search result. The query for imported issues will be `repo:[your/repo] no:project [your search query]`.

### Show story points and velocity chart

![Story point](https://raw.githubusercontent.com/kechol/enhanced-github-projects/master/misc/images/story-point-and-chart.png)

You can show your story points per issue on the top of each column. Also you can even show the velocity chart!
You can choose how to calculate the story points via EGP config menu. Currently it supports two options.

- Count by issue: Count each issue as one point
- Count by point on title: Count points based on `[Npt]` on each issue title

## How to use

1. Get your access token
   Please create your access token for GitHub API via https://github.com/settings/tokens/new . Please allow `repo` scope to the token.
   ![Access token](https://raw.githubusercontent.com/kechol/enhanced-github-projects/master/misc/images/access-token.png)

2. Put your access token via config menu
   ![Config](https://raw.githubusercontent.com/kechol/enhanced-github-projects/master/misc/images/egp-config.png)

3. All set!

## Known issues

- The story points cannot be updated when a card is archived from the project.
- Does not support organizational projects

## License

MIT
