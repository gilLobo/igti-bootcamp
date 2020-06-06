import fs from 'fs';
import app from './app';

global.path = './src/arquivos/';
global.state = 'Estados.json';
global.city = 'Cidades.json';
let ListaUFs = [];
let countCityForUf = [];

app.listen(3333, () => {

  /*
    ####################################################################################
    #################################### Session 1 #####################################
    ####################################################################################
  */
  const folder = 'arquivos';

  const getFileData = (path) => {
    return JSON.parse(fs.readFileSync(path));
  }

  const generateAllCitiesByStateFiles = () => {
    const allStates = getAllStates();
    const allCities = getAllCities();

    allStates
      .map(processCitiesByStateFileData(allCities))
      .forEach(generateCitiesByStateFile);
  };

  const getAllStates = () => {
    return getFileData(`./src/${folder}/Estados.json`);
  };

  const getAllCities = () => {
    return getFileData(`./src/${folder}/Cidades.json`);
  };

  const getStateCities = (uf) => {
    return getFileData(`./src/${folder}/${uf.toUpperCase()}.json`);
  };

  const processCitiesByStateFileData = (allCities) => (state) => ({
    filename  : `./src/${folder}/${state.Sigla}.json`,
    data      : JSON.stringify(allCities.filter(city => city.Estado === state.ID))
  });

  const generateCitiesByStateFile = ({filename, data}) => {
    fs.mkdirSync(folder, {
      recursive: true
    });

    fs.writeFileSync(filename, data);
  };

  /*
    ####################################################################################
    #################################### Session 1 #####################################
    ####################################################################################
  */

  /*
    ####################################################################################
    #################################### Session 2 #####################################
    ####################################################################################
  */

  const getTotalCitiesByState = (uf) => {
    return getStateCities(uf).length;
  }

  const getStatesWithTotalCities = () => {
    return getAllStates()
      .map(state => ({
        uf: state.Sigla,
        totalCities: getTotalCitiesByState(state.Sigla)
      }));
  };

  const printStatesWithMostCities = () => {
    const top5 = getStatesWithTotalCities()
      .sort((a, b) => b.totalCities - a.totalCities)
      .slice(0, 5)
      .map(data => `${data.uf} - ${data.totalCities}`);

    console.log(top5);
  }

  const printStatesWithLessCities = () => {
    const bottom5 = getStatesWithTotalCities()
      .sort((a, b) => a.totalCities - b.totalCities)
      .slice(0, 5)
      .map(data => `${data.uf} - ${data.totalCities}`);

    console.log(bottom5);
  }

  const getCityWithBiggestName = (uf) => {
    return getStateCities(uf)
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => b.Nome.length - a.Nome.length)[0];
  }

  const getCityWithShortestName = (uf) => {
    return getStateCities(uf)
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => a.Nome.length - b.Nome.length)[0];
  }

  const printBiggestNameCities = () => {
    const data = getAllStates()
      .map(state => ({
        uf    : state.Sigla,
        name  : getCityWithBiggestName(state.Sigla).Nome
      }))
      .map(city => `${city.name} - ${city.uf}`);

    console.log(data);
  }

  const printShortestNameCities = () => {
    const data = getAllStates()
      .map(state => ({
        uf    : state.Sigla,
        name  : getCityWithShortestName(state.Sigla).Nome
      }))
      .map(city => `${city.name} - ${city.uf}`);

    console.log(data);
  }

  const printBiggestNameCity = () => {
    const data = getAllStates()
      .map(state => ({
        uf    : state.Sigla,
        name  : getCityWithBiggestName(state.Sigla).Nome
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.name.length - a.name.length);

    console.log(data[0]);
  }

  const printShortestNameCity = () => {
    const data = getAllStates()
      .map(state => ({
        uf    : state.Sigla,
        name  : getCityWithShortestName(state.Sigla).Nome
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.name.length - b.name.length);

    console.log(data[0]);
  }
  /*
    ####################################################################################
    #################################### Session 2 #####################################
    ####################################################################################
  */
  const init = () => {
    // Questão 1
    generateAllCitiesByStateFiles();

    // Questão 2
    getTotalCitiesByState('ac');

    // Questão 3
    printStatesWithMostCities();

    // Questão 4
    printStatesWithLessCities();

    // Questão 5
    printBiggestNameCities();

    // Questão 6
    printShortestNameCities();

    // Questão 7
    printBiggestNameCity();

    // Questão 8
    printShortestNameCity();
  }

  init();

});
