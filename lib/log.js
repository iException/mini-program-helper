const chalk = require('chalk')

module.exports = {
    base (msg = '') {
        console.log(msg)
    },

    error (msg = '') {
        console.log(`${chalk.bgRed('Error')} ${chalk.red(msg)}`)
    },

    info (msg = '') {
        console.log(`${chalk.bgCyan('Info')} ${chalk.cyan(msg)}`)
    },

    success (msg = '') {
        console.log(`${chalk.bgGreen('Success')} ${chalk.green(msg)}`)
    }
}