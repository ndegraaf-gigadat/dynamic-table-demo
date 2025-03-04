# Starter template for SvelteKit front-end projects

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/albertbronsky/4374189706320b84fc33f5ae71422105/raw/frontend-starter-template-coverage-badge.json)

Click the green "**Use this template**" button above on GitHub to create a new repository based on this template.

### Development

To run in development (watch) mode, use:

```bash
nvm use
npm install
npm run dev
```

### Building

To build this project:

```bash
nvm use
npm install
npm run build
```

After building, there is a `build` folder that contains the compiled static HTML files and JavaScript code.

If you want to preview this static site on your machine, use:

```bash
npm run preview
```

### Deployment

This project should be deployed to AWS S3 bucket since the resulting build is 100% static files and does not require any runtime to work.

A CDN (CloudFront) should be caching the S3 bucket contents to optimize the costs and speed up page load.

### Creating dynamic test coverage badge

1. Go to [create a new GitHub Gist](https://gist.github.com/). Use filename `repo-name-coverage-badge.json` (where `repo-name` is the name of your repository). Write anything in the contents. Click on Create **secret** gist.
2. Click on Raw button, note down the URL to the newly created gist (e.g. `https://gist.githubusercontent.com/albertbronsky/8e0541513c13b94172328dca056d403e/raw/a477c32cc8bdac0354138fa26943ea34e2ca0537/backend-starter-template-coverage-badge.json`). Remove revision ID part between `raw` and the filename.
3. Go to [Tokens in your GitHub settings](https://github.com/settings/tokens/new) and create a new token (use 'classic' one). Name it `Dynamic Badges`. Make it non-expiring. Select `gist` scope only. Save and note down that token.
4. Go to Repo settings -> Secrets and variables -> Actions. Create New repository secrets:
   - Name: `GIST_TOKEN`
   - Value: `<your generated token from before>`
   - Name: `GIST_ID`
   - Value: `<your gist ID from the URL>` (e.g. `8e0541513c13b94172328dca056d403e`)
   - Name: `GIST_FILENAME`
   - Value: `<your gist filename.json>` (e.g. `backend-starter-template-coverage-badge.json`)
5. Now in `README.md` of your repo put the badge as a link to `shields.io` (change the url parameter accordingly) under the title like this:

```
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/albertbronsky/8e0541513c13b94172328dca056d403e/raw/backend-starter-template-coverage-badge.json)
```
