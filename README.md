# Holochain-Kangaroo Electron

Put your Holochain App in this Kangaroo's electron pouch and let it run.

This repository let's you easily convert your Holochain app into a standalone, electron-based cross-platform Desktop app.

> [!WARNING]
> Support for non-breaking updates to happ coordinator zomes is currently not built into the kangaroo. It is expected that there is only ever one single version of a happ for any semver compatible range of versions of a kangaroo packaged app (see also [Versioning](#versioning))

# Holochain Versions

Depending on which Holochain minor version you want to use you should use the corresponding branch of this repository.


- Holochain 0.5.x (stable): [main-0.5](https://github.com/holochain/kangaroo-electron/tree/main-0.5)
- Holochain 0.6.x (dev): [main-0.6](https://github.com/holochain/kangaroo-electron/tree/main)
- Holochain 0.4.x: [main-0.4](https://github.com/holochain/kangaroo-electron/tree/main-0.4)
- Holochain 0.3.x: [main-0.3](https://github.com/holochain/kangaroo-electron/tree/main-0.3)

# Instructions

## Setup and Testing Locally

1. Either use this repository as a template (by clicking on the green "Use this template" button) or fork it.
   Using it as a template allows you to start with a clean git history and the contributors of this repository won't show up as contributors to your new repository. **Forking has the advantage of being able to relatively easily pull in updates from this parent repository at a later point in time.** If you fork it, it may be smart to work off a different branch than the main branch in your forked repository in order to be able to keep the main branch in sync with this parent repository and selectively merge into your working branch as needed.

2. In the `kangaroo.config.ts` file, replace the `appId` and `productName` fields with names appropriate for your own app.

3. In your local copy of the repository, run

```
yarn setup
```

4. Choose a version number in the `version` field of `kangaroo.config.ts`. And **Read** the section [Versioning](#Versioning) below to understand the implications.

5. Paste the `.webhapp` file of your holochain app into the `pouch` folder.
   **Note**: The kangaroo expects an `icon.png` of at least 256x256 pixel at the root level of your webhapp's UI assets.

6. To test it, run

```
yarn dev
```

## Build the Distributable

> [!WARNING]
> The default bootstrap, signaling and ICE servers (used for connection establishment among peers)
> in `kangaroo.config.ts` have no availability guarantees whatsoever and are meant for testing
> purposes only.
>
> If you want to deploy your app to end-users, make sure to run your own
> instances of these servers or use servers that have guaranteed availability for the lifetime
> of your app's network(s).
>
> **Changing these URLs *after* deployment of your app can result in a network partition**.


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

1. Make sure that CI has access to your app's .webhapp file by either
   - specifying the `webhapp` field in `kangaroo.config.ts` pointing to a URL where CI can fetch it and a sha256 to verify its integrity
   - remove `pouch/*.webhapp` from the `.gitignore` file and commit your .webhapp to git.

2. Create a draft release on github and set its "Tag verion" to the value of the `version` field that you chose in `kangaroo.config.ts` and prefix it with `v`, for example `v0.1.0`.

3. Merge the main branch into the release branch and push it to github to trigger the release workflow.

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

To allow for subsequent incompatible releases of your app (for example due to switching to a new Holochain version) without having to change the app's name or identifier, the kangaroo is set up to use semver to support incompatible versions of your app running fully independently from each other and store their data in dedicated locations on disk.

Examples:

- version 0.0.2 and 0.0.3 of your app will store their data in independent locations on disk and version 0.0.3 will not have access to any data created/obtained in version 0.0.2
- version 0.3.4 will reuse the same Holochain conductor and data as version 0.3.2
- versions 0.3.0-alpha and 0.3.0-beta will _not_ share data
- versions 0.3.0-alpha.0 and 0.3.0-alpha.1 _will_ share data

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
- `APPLE_CERTIFICATE`
- `APPLE_CERTIFICATE_PASSWORD`

3. Uncomment the line `afterSign: scripts/notarize.js` in `./templates/electron-builder-template.yml`.

> [!WARNING]
> **Unsigned applications are put under quarantine on macOS 15 (Sequoia).** The option in the Privacy & Security panel of the System Settings to allow them has been removed. To unset the quarantine attribute of an unsigned app,
the command `xattr -r -d com.apple.quarantine /path/to/app` can be executed from a Terminal. The app can then be run.

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

## Run your App from the command line

If you want to customize some runtime parameters you can run your app via the terminal and pass additional options:

```
Options:
  -V, --version                  output the version number
  -p, --profile <string>         Runs Holochain Kangaroo Electron (Test) with a custom profile with its own dedicated data store.
  -n, --network-seed <string>    If this is the first time running kangaroo with the given profile, this installs the happ with the
                                 provided network seed.
  --holochain-path <path>        Runs Holochain Kangaroo Electron (Test) with the holochain binary at the provided path. Use with caution
                                 since this may potentially corrupt your databases if the binary you use is not compatible with existing
                                 databases.
  --lair-path <path>             Runs the Holochain Kangaroo Electron (Test) with the lair binary at the provided path. Use with caution
                                 since this may potentially corrupt your databases if the binary you use is not compatible with existing
                                 databases.
  --holochain-rust-log <string>  RUST_LOG value to pass to the holochain binary
  --holochain-wasm-log <string>  WASM_LOG value to pass to the holochain binary
  --lair-rust-log <string>       RUST_LOG value to pass to the lair keystore binary
  -b, --bootstrap-url <url>      URL of the bootstrap server to use (not persisted across restarts).
  -s, --signal-url <url>      URL of the signaling server to use (not persisted across restarts).
  --ice-urls <string>            Comma separated string of ICE server URLs to use. Is ignored if an external holochain binary is being used
                                 (not persisted across restarts).
  --print-holochain-logs         Print holochain logs directly to the terminal (they will be still written to the logfile as well)
  -h, --help                     display help for command
```
