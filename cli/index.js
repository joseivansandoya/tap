const chalk = require('chalk');
const inquirer = require('inquirer');
const blessed = require('blessed');
const fetch = require('node-fetch');

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

async function getServerData () {
  const url = 'http://localhost:6006/';
  try {
    const response = await fetch (url);
    return response.json();
  }
  catch (err) {
    console.log('Error while fetching data', err);
  }
}

function mapValueToName (section, value) {
  const options = {
    header: {
      '1': 'Title H1',
      '2': 'Title H2',
      '3': 'Title H2 + Link'
    },
    body: {
      '1': 'Image',
      '2': 'Image + CTA',
      '3': 'Paragraph + CTA'
    },
    footer: {
      '1': 'Link',
      '2': 'Paragraph',
      '3': 'Paragraph + Link'
    }
  }

  return options[section][value];
}
