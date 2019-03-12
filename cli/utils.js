const fetch = require('node-fetch');

const getServerData = async () => {
  const url = 'http://localhost:6006/';
  try {
    const response = await fetch (url);
    return response.json();
  }
  catch (err) {
    //console.log('Error while fetching data', err);
    throw err;
  }
}

const mapValueToName = (section, value) => {
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

// exporting functions for unit testing
module.exports = {
  getServerData,
  mapValueToName
}
