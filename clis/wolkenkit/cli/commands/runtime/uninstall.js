'use strict';

const buntstift = require('buntstift'),
      getUsage = require('command-line-usage'),
      processenv = require('processenv');

const commands = require('../../../commands'),
      defaults = require('../../defaults.json'),
      globalOptionDefinitions = require('../../globalOptionDefinitions'),
      runtimes = require('../../../runtimes'),
      showProgress = require('../../showProgress');

const uninstall = {
  description: 'Uninstall a runtime version.',

  async getOptionDefinitions () {
    return [
      {
        name: 'version',
        alias: 'v',
        type: String,
        defaultValue: await runtimes.getLatestStableVersion(),
        description: 'version to uninstall',
        typeLabel: '<version>'
      },
      {
        name: 'env',
        alias: 'e',
        type: String,
        defaultValue: processenv('WOLKENKIT_ENV') || defaults.env,
        description: 'select environment',
        typeLabel: '<env>'
      }
    ];
  },

  async run (options) {
    if (!options) {
      throw new Error('Options are missing.');
    }
    if (!options.version) {
      throw new Error('Version is missing.');
    }
    if (!options.env) {
      throw new Error('Environment is missing.');
    }

    const directory = process.cwd(),
          { env, help, verbose, version } = options;

    if (help) {
      return buntstift.info(getUsage([
        { header: 'wolkenkit runtime uninstall', content: this.description },
        { header: 'Synopsis', content: 'wolkenkit runtime uninstall [--version <version>] [--env <env>]' },
        { header: 'Options', optionList: [ ...await this.getOptionDefinitions(), ...globalOptionDefinitions ]},
        {
          header: 'Remarks',
          content: [
            `If you don't specify a version, '${await runtimes.getLatestStableVersion()}' will be used as default.`,
            `If you don't specify an environment, '${processenv('WOLKENKIT_ENV') || defaults.env}' will be used as default.`
          ]
        }
      ]));
    }

    buntstift.info(`Uninstalling wolkenkit ${version} on environment ${env}...`);

    const stopWaiting = buntstift.wait();

    try {
      await commands.runtime.uninstall({
        directory,
        env,
        version
      }, showProgress(verbose, stopWaiting));
    } catch (ex) {
      stopWaiting();
      buntstift.error(`Failed to uninstall wolkenkit ${version} on environment ${env}.`);

      throw ex;
    }

    stopWaiting();
    buntstift.success(`Uninstalled wolkenkit ${version} on environment ${env}.`);
  }
};

module.exports = uninstall;
