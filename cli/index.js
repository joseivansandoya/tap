const chalk = require('chalk');
const inquirer = require('inquirer');
const blessed = require('blessed');
const { getServerData, mapValueToName } = require('./utils');

// print welcome message
const welcome = `
---------------------------
  Welcome to TAP metrics!  
---------------------------
`;
console.log(chalk.white.bgHex('#9c6efd').bold(welcome));

// request user input
inquirer
  .prompt([
    {
      type: 'list',
      name: 'proceed',
      message: 'What do you want to do?',
      default: true,
      choices: [
        {
          name: 'View metrics',
          value: true
        },
        {
          name: 'Exit',
          value: false
        }
      ]
    }
  ])
  .then(answer => {
    const { proceed } = answer;
    if (proceed) {
      const metricsMsg = chalk.yellow.bold('Loading metrics ...');
      console.log(metricsMsg);
      printTable();
    }
  });

async function printTable () {
  // Create a screen object.
  const screen = blessed.screen({
    smartCSR: true,
    scrollbar: true
  });
  
  screen.title = 'TAP metrics';

  // create new table instance
  const table = blessed.table({
    top: 'top',
    left: 'center',
    data: null,
    border: 'line',
    align: 'center',
    tags: true,
    width: 'shrink',
    style: {
      border: {
        fg: 'red'
      },
      cell: {
        fg: 'magenta'
      }
    }
  });

  let data = [
    ['Section', 'Value', 'Interactions']
  ];

  const serverData = await getServerData();
  //console.log('This is serverData', serverData);

  for (const key in serverData) {
    const sectionData = serverData[key];
    sectionData.forEach(element => {
      const section = String(key);
      const value = String(element.value);
      const interactions = String(element.interactions);
      data.push([
        section,
        mapValueToName(section, value),
        interactions
      ]);
    })
  }

  const tableMessage = `
  ${chalk.green.bold('TAP metrics table')}\n
  ${chalk.yellow('Press "q" to exit.')}
  `;

  const text = blessed.text({
    content: tableMessage
  });

  screen.key('q', function () {
    return screen.destroy()
  })

  table.setData(data)
  screen.append(table)
  screen.append(text)
  screen.render()
}
