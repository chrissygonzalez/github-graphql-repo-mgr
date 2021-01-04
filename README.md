# Setup

You'll need to create a `.env` file in the `github-graphql-repo-mgr` folder that contains a few variables (the access token will need `repo` and `delete_repo` access):

```
REACT_APP_GITHUB_KEY = (your personal access token)
REACT_APP_GITHUB_USER = (your GitHub login or the login of an account that you're an admin for)
```

Then, just `npm install && npm start` and you should hopefully see a list of your repos. 🤞🏼

## Note

The main purpose of this app was to make it faster to delete repos, so I could delete my 400-odd forked repos from the Flatiron School's Learn labs without having to drill into the GitHub UI for each one.

🚨 **This will really delete your repos! Be careful, you can't undo a delete!** 🚨

I defaulted to hiding the button for non-forked repos for a little extra safety, but it's still going to be easy to do something you might regret.
