# Holochain-Kangaroo Electron

Put your Holochain App in this Kangaroo's electron pouch and let it run.

This repository let's you easily convert your Holochain app into a standalone, electron-based cross-platform Desktop app.

**Note:** Support for non-breaking updates to happ coordinator zomes is currently not built into the kangaroo.

**Holochain Version**: Kangaroo Electron currently uses holochain 0.3.3.

# Instructions

## Setup and Testing Locally

1. Either use this repository as a template (by clicking on the green "Use this template" button) or fork it.
Using it as a template allows you to start with a clean git history and the contributors of this repository won't show up as contributors to your new repository. **Forking has the advantage of being able to relatively easily pull in updates from this parent repository at a later point in time.** If you fork it, it may be smart to work off a different branch than the main branch in your forked repository in order to be able to keep the main branch in sync with this parent repository and selectively merge into your working branch as needed.

2. In your local copy of the repository, run

```
yarn setup
```

3. In the `kangaroo.config.ts` file, replace the `appId` and `productName` fields with names appropriate for your own app.

4. Choose a version number in the `version` field of `kangaroo.config.ts`. And **Read** the section [Versioning](#Versioning) below to understand the implications.

4. Paste the `.webhapp` file of your holochain app into the `pouch` folder.
**Note**: The kangaroo expects a 1024x1024 pixel `icon.png` at the root level of your webhapp's UI assets.

5. To test it, run
```
yarn dev
```

## Build the Distributable

### Build locally
To build the app locally for your platform, run the build command for your respecive platform:

```
yarn build:linux

# or
yarn build:mac

# or
yarn build:windows
```
### Build on CI for all platforms

The general workflow goes as follows:

1. Create a draft release on github and set its "Tag verion" to the value of the `version` field that you chose in `kangaroo.config.ts` and prefix it with `v`, for example `v0.1.0`.

2. Merge the main branch into the release branch and push it to github to trigger the release workflow.

If you do this for the first time you will need to create the `release` branch first:
```
git checkout -b release
git merge main
git push --set-upstream origin release
```

For subsequent releases after that you can run
```
git checkout release
git merge main
git push
```

## Automatic Updates

By default, the kangaroo is set up to check github releases for semver compatible releases by their tag name whenever the app starts up and will prompt to install and restart if one is available. This can be disabled by setting `autoUpdates` to `false` in `kangaroo.config.ts`.

> [!NOTE]
> Note that once your app is deployed, this setting can only be turned on again for newer releases and users will have to manually install new versions.

## Versioning

To allow for subsequent incompatible releases of your app (for example due to switching to a new Holochain version or introducing a breaking change in the integrity zomes of your .happ) without having to change the app's name or identifier, the kangaroo is set up to use semver to support incompatible versions of your app running fully independently from each other and store their data in dedicated locations on disk.

Examples:
* version 0.0.2 and 0.0.3 of your app will store their data in independent locations on disk and version 0.0.3 will not have access to any data created/obtained in version 0.0.2
* version 0.3.4 will reuse the same Holochain conductor and data as version 0.3.2
* versions 0.3.0-alpha and 0.3.0-beta will *not* share data
* versions 0.3.0-alpha.0 and 0.3.0-alpha.1 *will* share data

> [!NOTE]
> It is your responsibility to make sure that if you mark two versions of your app as semver compatible they actually are compatible (e.g. that you don't try to run a new incompatible version of Holochain on existing databases).

## Code Signing

### macOS

To use code signing on macOS for your release in CI you will have to

1. Set the `macOSCodeSigning` field to `true` in `kangaroo.config.ts`
2. Add the following secrets to your github repository with the appropriate values:
- `APPLE_DEV_IDENTITY`
- `APPLE_ID_EMAIL`
- `APPLE_ID_PASSWORD`
- `APPLE_TEAM_ID`


### Windows

If you want to code sign your app with an EV certificate, you can follow [this guide](https://melatonin.dev/blog/how-to-code-sign-windows-installers-with-an-ev-cert-on-github-actions/) to get your EV certificate hosted on Azure Key Vault and then

1. Set the `windowsEVCodeSigning` field to `true` in `kangaroo.config.ts`
2. Add all the necessary secrets to the repository:
- `AZURE_KEY_VAULT_URI`
- `AZURE_CERT_NAME`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`


## Permissions on macOS

Access to things like camera and microphone on macOS require special permissions to be set in the .plist file. For this, uncomment the corresponding permissions in `./templates/electron-builder-template.yml` as needed.


