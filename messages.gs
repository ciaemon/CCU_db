const EMAIL_MISMATCH_MESSAGE = 'Email в заявке не совпадает с адресом отправки!\n';
const INVALID_EMAIL_MESSAGE = 'Email в заявке иммет неверный формат!!! \n';
const OLD_VERSION_MESSAGE = 'Вы используете устаревшую версию заявки, пожалуйста, скачайте новую\n';
const BLANKS_MESSAGE = 'Заявка содержит пустые поля, обязательные для заполнения: \n';
/**
* Constructs message for blanks
*/
function constructMessageBlanks(blanks) {
  
  if (blanks.length === 0) {
    return '';
  }
  let message = BLANKS_MESSAGE;
  for (let i = 0; i < blanks.length - 1; i++) {
    message += blanks[i] + ', ';
  }
  message += blanks[blanks.length - 1] + '.\n';
}

function constructWarnMessage(reqObj) {
  let message = '';
  
//  Проверка на совпадение email
  var email = DriveApp.getFileById(reqObj.id).getDescription();
  if (email.indexOf(reqObj.customer.email) < 0) {
    message += EMAIL_MISMATCH_MESSAGE;
  }
  
//  Проверка на актуальную версию
  if (!checkVersion(reqObj)) {
    message += OLD_VERSION_MESSAGE;
  }
//  Проверка на пустые поля в старых версиях
  if (reqObj.version !== LATEST_VERSION) {
    message += constructMessageBlanks(findBlanks(reqObj));
  }
  return message;
}

function constructRejectMessage(reqObj) {
  let message = '';
  
  //  Проверка на пустые поля в старых версиях
  if (reqObj.version !== LATEST_VERSION) {
    message += constructMessageBlanks(findBlanks(reqObj));
  }
  if (!validateEmail(reqObj.email) && reqObj.version === LATEST_VERSION) {
    message += INVALID_EMAIL_MESSAGE;
  }
}


