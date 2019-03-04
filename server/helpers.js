const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dataPath = './server/data.json';

const initializeData = async () => {
  try {
    await writeFile(dataPath, '[]', 'utf8');
  } catch (err) {
    console.log('Error at writing data: ', err);
  }
}

const getData = async () => {
  try {
    return await readFile(dataPath, 'utf8');
  } catch (err) {
    console.log('Error at getting data: ', err);
  }
}

const storeData = async (userInfo) => {
  const data = await getData();
  const parsedData = JSON.parse(data);

  parsedData.header.push({"value": userInfo.header, "interactions": 0});
  parsedData.body.push({"value": userInfo.body, "interactions": 0});
  parsedData.footer.push({"value": userInfo.footer, "interactions": 0});
  try {
    await writeFile(dataPath, JSON.stringify(parsedData), 'utf8');
  } catch (err) {
    console.log('Error at writing data: ', err);
  }
}

const updateData = async ({section}) => {
  const data = await getData();
  let parsedData = JSON.parse(data);
  let dataSection = parsedData[section];
  dataSection[dataSection.length - 1].interactions ++;
  parsedData[section] = dataSection;
  try {
    await writeFile(dataPath, JSON.stringify(parsedData), 'utf8');
    return parsedData;
  } catch (err) {
    console.log('Error at writing data: ', err);
  }
}

module.exports = {
  initializeData,
  getData,
  storeData,
  updateData
};
