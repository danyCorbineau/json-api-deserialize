const fs = require('fs');
const path = require('path');

const deserialize = require('../../dist').deserialize;

// Fixtures
const resourceResponses = [
  require('../__fixtures__/resource_1.json'),
  require('../__fixtures__/resource_2.json'),
  require('../__fixtures__/resource_3.json'),
];

const collectionResponses = [
  require('../__fixtures__/collection_1.json'),
];

describe('JsonApiDeserializer', () => {
  resourceResponses.forEach((resourceResponse, index) => {
    describe(`Resource Response (${index + 1})`, () => {
      const deserializedResponse = deserialize(resourceResponse, { normalize: false });

      fs.writeFileSync(
        path.join(__dirname, `../__outputs__/resource_output_${index + 1}.json`),
        JSON.stringify(deserializedResponse)
      );

      test('RO data object contains nested full resource objects', () => {
        expect(deserializedResponse).toMatchSnapshot();
      });

      test('RO shouldn\'t have included property', () => {
        expect(deserializedResponse.data.included).toBeFalsy();
      });
    });
  });

  collectionResponses.forEach((collectionResponse, index) => {
    describe(`Collection Response (${index + 1})`, () => {
      const deserializedResponse = deserialize(collectionResponse, { normalize: false });

      fs.writeFileSync(
        path.join(__dirname, `../__outputs__/collection_output_${index + 1}.json`),
        JSON.stringify(deserializedResponse)
      );

      test('RO data object contains nested full resource objects', () => {
        expect(deserializedResponse).toMatchSnapshot();
      });

      test('RO shouldn\'t have included property', () => {
        expect(deserializedResponse.data.included).toBeFalsy();
      });
    });
  });
});
