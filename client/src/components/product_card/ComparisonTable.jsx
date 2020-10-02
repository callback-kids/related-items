import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const exampleData = {
  name: 'product 1',
  price: 50,
  features: [{ feature: 'Fabric', value: '100% Cotton' }, { feature: 'Cut', value: 'Skinny' }, { feature: 'testSame', value: 'same' }, { feature: 'testOne', value: 'one' }],
};

const exampleData2 = {
  name: 'product 2',
  price: 75,
  features: [{ feature: 'Fabric', value: '99% Cotton 1% Elastic' }, { feature: 'Cut', value: 'Loose' }, { feature: 'testSame', value: 'same' }, { feature: 'testTwo', value: 'two' }],
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

const ComparisonTable = ({ productData, productCompare }) => {
  const [tableData, updateTable] = useState([]);

  useEffect(() => {
    const newTable = generateTableData(productData.features, productCompare.features);
    updateTable(newTable);
  }, []);

  return (
    <table className="comparison-table">
      <tr>
        <th className="title-text">{productData.name}</th>
        <th> </th>
        <th className="title-text">{productCompare.name}</th>
      </tr>
      <tr>
        <td>{`$${productData.price}`}</td>
        <td>PRICE</td>
        <td>{`$${productCompare.price}`}</td>
      </tr>
      {
        tableData.map((item) => (
          <tr>
            <td>{item.valueOne === 'null' ? <p className="checkmark">&#10003;</p> : item.valueOne}</td>
            <td>{item.feature.toUpperCase()}</td>
            <td>{item.valueTwo}</td>
          </tr>
        ))
      }
    </table>
  );
};

ComparisonTable.propTypes = {
  productData: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    id: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

  productCompare: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    id: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

};

export default ComparisonTable;
