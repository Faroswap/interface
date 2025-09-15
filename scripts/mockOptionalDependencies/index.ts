import fs from 'fs-extra';

async function main() {
  fs.copySync('./scripts/mockOptionalDependencies/packages', './node_modules');
}

main();
