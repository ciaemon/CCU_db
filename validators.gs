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
    if (key !== 'supervisor' && customer[key] === '') {
      blanks.push(reqNames[key]);
    }
  }
  const probe = reqObj.probe;
  for (let key in probe) {
    if (key !== 'knownCells' && key !== 'desiredCells' && probe[key] === '') {
      blanks.push(reqNames[key]);
    }
  }
  const task = reqObj.task;
  for (let key in task) {
    if (probe[key] === '') {
      blanks.push(reqNames[key]);
    }
  }
  
  for (let key in probe) {
    if (typeof reqObj[key] === 'string' && reqObj[key] === '') {
      blanks.push (reqNames[key]);
    }
  }
  return blanks;
}




  
  
  