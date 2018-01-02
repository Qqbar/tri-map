function setKeyValue(key, value) {
  // console.log(`Storing ${value} to ${key}`);
  localStorage.setItem(key, value);
}

function getKeyValue(key) {
  // console.log(`Retrieving ${key} value from storage`);
  var val = localStorage.getItem(key);
  if (val) {
    return val
  }
}

export {setKeyValue, getKeyValue}
