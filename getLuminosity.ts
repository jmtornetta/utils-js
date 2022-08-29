function getLuminosity(hexColor:string):number {
  const _color = hexColor.substring(1);      // strip #
  const rgb = parseInt(_color, 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >>  8) & 0xff;  // extract green
  const b = (rgb >>  0) & 0xff;  // extract blue
  
  // Values less than '40' are dark.
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Per ITU-R BT.709
}