// #!/usr/bin/env node

let program = require('commander')
let colors = require('colors')
let p = require('child_process')

program
  .version(require('../package').version)
  .option('-d, --date', 'show time')

program
  .command('setup')
  .description('run remote setup commands')
  .action(function() {
    console.log('setup')
  })

program
  .command('exec <cmd>')
  .description('run the given remote command')
  .action(function(cmd) {
    console.log('exec "%s"', cmd)
  })

program
  .command('teardown <dir> [otherDirs...]')
  .description('run teardown commands')
  .action(function(dir, otherDirs) {
    console.log('dir "%s"', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('dir "%s"', oDir);
      });
    }
  })

program
   .command('*')
   .description('deploy the given env')
   .action(function(env) {
     console.log('deploying "%s"', env);
   })

program.parse(process.argv)

process.stdin.on('readable', function(chunk) {
  console.log(`
███╗
█╔═█╗
█║ ╚█╗ ███╗ █╗██╗ █╗██╗  ███╗ █╗██╗
█║  █║ ╚══█╗██╬═█╗██╬═█╗█╬══█╗██╬═█╗
█║  █║ ████║█╔╝ ╚╝█╔╝ ╚╝█████║█╔╝ █║
█║ █╬╝█╬══█║█║    █║    █╔═══╝█║  █║
███╬╝ ╚████║█║    █║    ╚███╗ █║  █║
╚══╝   ╚═══╝╚╝    ╚╝     ╚══╝ ╚╝  ╚╝
  `)
})

console.log(process.argv[1].rainbow)

function init () {
  let nodeVersion = p.execSync('node -v').toString()
  let npmVersion = p.execSync('npm -v').toString()

  console.log(`
node: ${nodeVersion}npm: ${npmVersion}`)
}

init()
