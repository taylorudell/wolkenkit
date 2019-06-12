# Changelog

Read what has changed in wolkenkit.

## latest

The following significant changes have been made since wolkenkit `3.1.0`:

- **[BREAKING] Added** support to use multiple identity providers at once
  - In the past, to use authentication, you had to configure an identity provider. Now it is possible to use one or even multiple identity providers at the same time, for example to support different user groups. For details on how to update your current application configuration, see [updating an application](../../../../latest/getting-started/updating-wolkenkit/updating-an-application/).
- **[BREAKING] Changed** how to configure an application's API address
  - The configuration in the `package.json` file for the host and port of a wolkenkit application's API have changed. For details on how to adjust your current application configuration, see [updating an application](../../../../latest/getting-started/updating-wolkenkit/updating-an-application/).
- **Added** transformations for read models
  - If you have accessed a read model in the past, it has been read and delivered as is. The new version of wolkenkit now offers the possibility to modify and filter data while reading by [using transformations](../../../../latest/reference/creating-the-read-model/defining-transformations/).
- **Added** the option to set the ID of file uploads manually
  - When you upload a file to the file storage, an ID is created and returned for that file. Now it is also possible to [set the ID manually](../../../../latest/reference/storing-large-files/adding-files/#setting-the-id-manually).
- **Added** support for EcmaScript 2018 and 2019
  - In previous versions, wolkenkit supported EcmaScript 2017 and earlier. The new version now also contains support for EcmaScript 2018 and 2019, which lets you use the latest language features.
- **Added** code validation when starting an application
  - When starting a wolkenkit application, the CLI now verifies whether all required directories and files exist, and if the files contain and export the required structure.
- **Added** a guide on how to use the latest runtime
  - Although generally not recommended for developers of wolkenkit applications, from time to time it may make sense to use the `latest` runtime, e.g. to evaluate new features that have not yet been officially released. There are a number of pitfalls you have to watch out for when doing this, which is why there is now a guide that explains how to [use the latest runtime](../../../../latest/guides/using-the-latest-runtime/overview/).
- **Improved** the CLI error messages
  - In the past, when something went wrong e.g. while running `wolkenkit start`, you were left with a generic error message. This has been improved, as you now always see the error's details, even if you are not in verbose mode.
- **Fixed** `start` with an empty read model
  - In the past, running `wolkenkit start` led to an error if no read model had been defined. This has been changed, so you can start even if you did not yet define any lists, but only commands.
- **Contributions** by the community
  - [@damienbenon](https://github.com/damienbenon)
  - [@devmcc](https://github.com/devmcc)
  - [@jbeaudoin11](https://github.com/jbeaudoin11)
  - [@lorenzleutgeb](https://github.com/lorenzleutgeb)
  - [@madfist](https://github.com/madfist)
  - [@manfredmjka](https://github.com/manfredmjka)
  - [@schmuto](https://github.com/schmuto)
  - [@steffengottschalk](https://github.com/steffengottschalk)
  - [@timrach](https://github.com/timrach)

For details on how to update to version `latest` see [updating the CLI](../../../../latest/getting-started/updating-wolkenkit/updating-the-cli/) and [updating an application](../../../../latest/getting-started/updating-wolkenkit/updating-an-application/).