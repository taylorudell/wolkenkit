'use strict';

const buntstift = require('buntstift'),
      eslint = require('eslint'),
      getUsage = require('command-line-usage'),
      processenv = require('processenv'),
      stripIndent = require('common-tags/lib/stripIndent');

const commands = require('../../../commands'),
      defaults = require('../../defaults.json'),
      globalOptionDefinitions = require('../../globalOptionDefinitions'),
      showProgress = require('../../showProgress');

const start = {
  description: 'Start an application.',

  async getOptionDefinitions () {
    return [
      {
        name: 'dangerously-expose-http-ports',
        type: Boolean,
        defaultValue: defaults.commands.application.start.dangerouslyExposeHttpPorts,
        description: 'expose http ports'
      },
      {
        name: 'debug',
        alias: 'd',
        type: Boolean,
        defaultValue: defaults.commands.application.start.debug,
        description: 'enable debug mode'
      },
      {
        name: 'env',
        alias: 'e',
        type: String,
        defaultValue: processenv('WOLKENKIT_ENV') || defaults.env,
        description: 'select environment',
        typeLabel: '<env>'
      },
      {
        // The port has no default value set, as this depends on the
        // application's package.json file, which is not available here.
        name: 'port',
        alias: 'p',
        type: Number,
        description: 'set port',
        typeLabel: '<port>'
      },
      {
        name: 'private-key',
        alias: 'k',
        type: String,
        description: 'select private key',
        typeLabel: '<file>'
      }
    ];
  },

  async run (options) {
    if (!options) {
      throw new Error('Options are missing.');
    }
    if (options['dangerously-expose-http-ports'] === undefined) {
      throw new Error('Dangerously expose http ports is missing.');
    }
    if (options.debug === undefined) {
      throw new Error('Debug is missing.');
    }
    if (!options.env) {
      throw new Error('Environment is missing.');
    }

    const directory = process.cwd(),
          { debug, env, help, port, verbose } = options;

    const dangerouslyExposeHttpPorts = options['dangerously-expose-http-ports'],
          privateKey = options['private-key'];

    if (help) {
      return buntstift.info(getUsage([
        { header: 'wolkenkit application start', content: this.description },
        { header: 'Synopsis', content: stripIndent`
          wolkenkit application start [--port <port>] [--env <env>] [--dangerously-expose-http-ports] [--debug]
          wolkenkit application start [--env <env>] [--private-key <file>]` },
        { header: 'Options', optionList: [ ...await this.getOptionDefinitions(), ...globalOptionDefinitions ]}
      ]));
    }

    buntstift.info('Starting the application...');

    const stopWaiting = buntstift.wait();

    try {
      await commands.application.start({
        directory,
        dangerouslyExposeHttpPorts,
        debug,
        env,
        port,
        privateKey
      }, showProgress(verbose, stopWaiting));
    } catch (ex) {
      stopWaiting();

      switch (ex.code) {
        case 'ECODEMALFORMED': {
          const formatter = eslint.CLIEngine.getFormatter();

          const formattedResult = formatter(ex.cause.results);
          const output = formattedResult.
            split('\n').
            slice(0, -2).
            join('\n');

          buntstift.info(output);
          buntstift.info(ex.message);
          break;
        }
        case 'ERUNTIMEERROR': {
          if (ex.orginalError) {
            buntstift.newLine();
            buntstift.info(ex.orginalError.stack);
            buntstift.newLine();
          }

          buntstift.info('Application code caused runtime error.');
          break;
        }
        default:
          break;
      }

      buntstift.error('Failed to start the application.');

      throw ex;
    }

    stopWaiting();
    buntstift.success('Started the application.');
  }
};

module.exports = start;
