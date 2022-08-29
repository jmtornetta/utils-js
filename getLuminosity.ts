function getLuminosity(hexColor:string):number {
  // Values greater than '150' are light.
  const rgb = parseInt(hexColor.replace(/^\s*#/,""), 16);   // Strip # and leading spaces and convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >>  8) & 0xff;  // extract green
  const b = (rgb >>  0) & 0xff;  // extract blue
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Per ITU-R BT.709
}