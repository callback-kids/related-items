import React from 'react';

const exampleData = {
  name: 'product 1',
  price: 50,
  features: [{"feature":"Fabric","value":"100% Cotton"},{"feature":"Cut","value":"Skinny"}, {"feature":"testSame","value":"same"}, {"feature":"testOne","value":"one"}],
};

const exampleData2 = {
  name: 'product 2',
  price: 75,
  features: [{"feature":"Fabric","value":"99% Cotton 1% Elastic"},{"feature":"Cut","value":"Loose"}, {"feature":"testSame","value":"same"}, {"feature":"testTwo","value":"two"}],
};

const generateTableData = (arr1, arr2) => {
  const output = [];
  arr1.forEach((item) => {
    output.push({ feature: item.feature, valueOne: item.value, valueTwo: null });
  });
  arr2.forEach((item) => {
    let featureFound = false;
    // check if feature exists already
    output.forEach((feature, index) => {
      if (item.feature === feature.feature) {
        output[index].valueTwo = item.value;
        featureFound = true;
      }
    });
    // if feature doesn't exist add new item to output array
    if (!featureFound) {
      output.push({ feature: item.feature, valueOne: null, valueTwo: item.value });
    }
  });
  return output;
};

const table = generateTableData(exampleData.features, exampleData2.features);

const ComparisonTable = () => (
  <table>
    <tr>
      <th>{exampleData.name}</th>
      <th> </th>
      <th>{exampleData2.name}</th>
    </tr>
    <tr>
      <td>{`$${exampleData.price}`}</td>
      <td>Price</td>
      <td>{`$${exampleData2.price}`}</td>
    </tr>
    {
      table.map((item) => (
        <tr>
          <td>{item.valueOne}</td>
          <td>{item.feature}</td>
          <td>{item.valueTwo}</td>
        </tr>
      ))
    }
  </table>
);

export default ComparisonTable;
