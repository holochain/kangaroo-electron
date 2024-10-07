# Holochain-Kangaroo Electron

Put your Holochain App in this Kangaroo's electron pouch and let it run.

This repository let's you easily convert your Holochain app into a standalone, electron-based cross-platform Desktop app.

**Note:** Support for non-breaking updates to happ coordinator zomes is currently not built into the kangaroo.


# Instructions

1. Either use this repository as a template (by clicking on the green "Use this template" button) or fork it.
Using it as a template allows you to start with a clean git history and the contributors of this repository won't show up as contributors to your new repository. **Forking has the advantage of being able to relatively easily pull in updates from this parent repository at a later point in time.**

2. In your local copy of the repository, run

```
yarn setup
```

3. In the `kangaroo.config.ts` file, replace the `appId` and `productName` fields with names appropriate for your own app.

4. Paste the `.webhapp` file of your holochain app into the `pouch` folder.

5. To test it, run
```
yarn dev
```

6. To build it locally for your platform, run the build command for your respecive platform
```
yarn build:linux

# or
yarn build:mac

# or
yarn build:windows
```

7. To build the app in CI the first time, create a Draft release on github and set its "Tag verion" to the value of the `version` field that you chose in `kangaroo.config.ts` and prefix it with `v`, e.g. `v0.1.0`. Then create a release branch, merge the main branch into it and push to github.

```
git checkout -b release
git merge main
git push --set-upstream origin release
```











