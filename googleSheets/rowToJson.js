/**
 * Converts a row of data into a JSON object with keys derived from the headers.
 * Skips keys for which the cell in the row is empty.
 *
 * @param {Array} headers Array containing the header names.
 * @param {Array} row Array containing the values in the current row.
 * @return JSON string representing the row data as an object.
 * @customfunction
 */
function ROW_TO_JSON(headers, row) {
  // Initialize an empty object to hold our JSON structure
  let jsonObject = {};

  // Loop through each header to use as keys
  headers[0].forEach((key, index) => {
    // Check if the corresponding row value is not empty
    if (row[0][index]) {
      // Add the key-value pair to the jsonObject
      jsonObject[key] = row[0][index];
    }
  });

  // Convert the JavaScript object to a JSON string
  return JSON.stringify(jsonObject);
}