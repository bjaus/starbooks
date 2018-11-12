const sanitize = data => {
  const dataArray = [];

  if (Array.isArray(data)) {
    // multiple satetlites passed in
    for (let i = 0; i < data.length; i++) {
      let item = restructure(data[i]);
      dataArray.push(item);
    }
  } else {
    // single satellite passed in
    let item = restructure(data);
    dataArray.push(item);
  }
  return dataArray
}

const restructure = data => {
  return {
    satellite_id: data.satellite_id,
    timestamp: new Date(data.timestamp * 1000),
    collection: data.collection.map(col => {
      if (!col.errors || col.errors === null) {
        col.errors = [];
      }
      return {
        set_id: col.set_id,
        status: col.status,
        condition: col.condition,
        _errors: col.errors
      }
    })
  }
}

const sorter = (array, key) => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  })
}

module.exports = sanitize;