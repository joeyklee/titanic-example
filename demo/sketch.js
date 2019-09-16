let $ageInput,
  $ageInputText,
  $fareInput,
  $fareInputText,
  $sexInput,
  $predictBtn,
  $predictionText;
let sample = [0, 0, 0];


const TRAIN_DATA_PATH = 'data/titanic_train.csv';
const TEST_DATA_PATH = 'data/titanic_test.csv';

let nn;

let data;
const neuralNetOptions = {
  inputs: 3,
  outputs: 2,
  debug: true,
  outputLabels: ['survived'],
  inputLabels: ['age', 'fare', 'is_female']
}

document.addEventListener('DOMContentLoaded', async function () {

  nn = new NeuralNet(neuralNetOptions)
  await nn.createModel();
  data = await nn.loadData(TRAIN_DATA_PATH, 'csv');

  normalizedData = await nn.parseData(data)
  await nn.train(normalizedData.inputs, normalizedData.labels);

  initButtons();
})

function initButtons(){

  $ageInput = document.querySelector('#ageInput');
  $ageInputText = document.querySelector('#ageInputText');
  $fareInput = document.querySelector('#fareInput');
  $fareInputText = document.querySelector('#fareInputText');
  $sexInput = document.querySelector('#sexInput');
  $predictBtn = document.querySelector('#predictBtn');
  $predictionText = document.querySelector('#predictionText');

  sample[0] = Number($ageInput.value)
  sample[1] = Number($fareInput.value)
  sample[2] = Number($sexInput.value)

  $ageInput.addEventListener('change', function (e) {
    $ageInputText.textContent = e.target.value
    sample[0] = Number(e.target.value)
  })

  $fareInput.addEventListener('change', function (e) {
    $fareInputText.textContent = e.target.value
    sample[1] = Number(e.target.value)
  })

  $sexInput.addEventListener('change', function (e) {
    sample[2] = Number(e.target.value)
  })
  
  $predictBtn.addEventListener('click', async function(e){
    const result = await nn.predict(sample);
    console.log(result);
    $predictionText.textContent = survivedCode(result);
  })
}


// Returns the string value for Baseball pitch labels
function survivedCode(classNum) {
  switch (classNum) {
      case 0:
          return 'Did not survive';
      case 1:
          return 'Survived!';
      default:
          return 'Unknown';
  }
}



// const TRAIN_DATA_PATH = 'data/titanic_train.csv';
// const TEST_DATA_PATH = 'data/titanic_test.csv';


// let neuralNet;
// const dataset_options = {columnConfigs: {survived: {isLabel: true}}}

// let $ageInput,
//     $ageInputText,
//     $fareInput,
//     $fareInputText,
//     $sexInput,
//     $predictBtn,
//     $predictionText;

// let sample = [0,0,0]

// $ageInput = document.querySelector('#ageInput');
// $ageInputText = document.querySelector('#ageInputText');
// $fareInput = document.querySelector('#fareInput');
// $fareInputText = document.querySelector('#fareInputText');
// $sexInput = document.querySelector('#sexInput');
// $predictBtn = document.querySelector('#predictBtn');
// $predictionText = document.querySelector('#predictionText');

// sample[0]= Number($ageInput.value)
// sample[1]= Number($fareInput.value)
// sample[2]= Number($sexInput.value)

// $ageInput.addEventListener('change', function(e){
//   $ageInputText.textContent = e.target.value
//   sample[0] = Number(e.target.value)
// })

// $fareInput.addEventListener('change', function(e){
//   $fareInputText.textContent = e.target.value
//   sample[1] = Number(e.target.value)
// })

// $sexInput.addEventListener('change', function(e){
//   sample[2] = Number(e.target.value)
// })



// async function setup() {

//     neuralNet = new NeuralNet();

//     $predictBtn.addEventListener('click', async function(e){
//       const result = await neuralNet.predictSample(sample);
//       console.log(result);
//       $predictionText.textContent = JSON.stringify(result);
//     })

//     await neuralNet.loadCSV(TRAIN_DATA_PATH,  'training', dataset_options);
//     await neuralNet.loadCSV(TEST_DATA_PATH,  'testing', dataset_options);
//     await neuralNet.loadCSV(TRAIN_DATA_PATH,  'validating', dataset_options);
//     await neuralNet.prepareData('training');
//     await neuralNet.prepareData('testing');
//     await neuralNet.prepareData('validating');

//     await neuralNet.train();
//     // console.log(neuralNet);

//   }

// setup();