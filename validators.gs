/**
 * Returns true if email is valid
 * */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const LATEST_VERSION = 'V 1.16';
/**
 * Returns true if template is up-to-date
 * */
function checkVersion(reqObj) {
    const version = reqObj.version;
    return version === LATEST_VERSION;
}

/**
* Searching for blank fields
* Returns array of blank fields names
*/
function findBlanks(reqObj) {
  const customer = reqObj.customer;
  let blanks = [];
  for (let key in customer) {
    if (key !== 'supervisor' && customer[key].length == 0) {
      blanks.push(reqNames.customer[key]);
    }
  }
  const probe = reqObj.probe;
  for (let key in probe) {
    if (key !== 'knownCells' && key !== 'desiredCells' && probe[key].length == 0) {
      blanks.push(reqNames.probe[key]);
    }
  }
  const task = reqObj.task;
  for (let key in task) {
    if (task[key].length == 0) {
      blanks.push(reqNames.task[key]);
    }
  }
  
  for (let key in reqObj) {
    if (typeof reqObj[key] === 'string' && reqObj[key].length == 0) {
      blanks.push(reqNames[key]);
    }
  }
  return blanks;
}




  
  
  