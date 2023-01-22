import Ajv, { JSONSchemaType } from 'ajv';

/**
 * @description Validate the JSON data using AJV
 *
 * @param {JSONSchemaType<unknown>} schema - JSON schema to validate against
 * @param {Object<unknown>} data - JSON data to validate
 * @return {Object} - validated JSON data
 * @throw - validation errors
 *
 * @example
 * const data = await fetchData();
 * const validatedData = await validateJSON(responseSchema, data);
 */
const validateJSON = <T, U>(schema: JSONSchemaType<T>, data: U): U => {
  try {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      console.log('AJV validation failed', validate.errors);
      let errorMessage = '';
      validate.errors?.forEach((error) => {
        errorMessage += `${error.params.schemaPath} ${error.message}\n`;
      });
      throw new Error(errorMessage);
    }
    return data;
  } catch (err) {
    console.log('validation function failed', err);
    throw err;
  }
};

export default validateJSON;
