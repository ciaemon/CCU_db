const EMAIL_MISMATCH_MESSAGE = 'Email в заявке не совпадает с адресом отправки\n';
const INVALID_EMAIL_MESSAGE = 'Email в заявке имеет неверный формат!!! \n';
const OLD_VERSION_MESSAGE = 'Вы используете устаревшую версию заявки, пожалуйста, скачайте новую версию V 1.16 на ftp://heap/incoming/520_SCXRD/\n';
const BLANKS_MESSAGE = 'Заявка содержит пустые поля, обязательные для заполнения: \n';
/**
* Constructs message for blanks
*/
function constructMessageBlanks(blanks) {
  
  if (blanks.length == 0) {
    return '';
  }
  let message = BLANKS_MESSAGE;
  for (let i = 0; i < blanks.length - 1; i++) {
    message += blanks[i] + ', ';
  }
  message += blanks[blanks.length - 1] + '.\n';
  return message;
}

function constructWarnMessage(reqObj) {
  let message = '';
  
//  Проверка на совпадение email
  var email = DriveApp.getFileById(reqObj.id).getDescription();
  if (email.indexOf(reqObj.customer.email) < 0) {
    message += EMAIL_MISMATCH_MESSAGE;
    message += 'Email в заявке: ' + reqObj.customer.email + '\n';
    message += 'Email отправки: ' + email + '\n';
    
    message += 'Вся дальнейшая корреспонденция будет отправлена на ' + reqObj.customer.email + ' \n\n';
    message += 'Если это сделано ненамеренно, для исправления обратитесь к Комарову Владиславу\n';
    
  }
  
  return message;
}

function constructRejectMessage(reqObj) {
  let message = '';
  //  Проверка на актуальную версию
  if (!checkVersion(reqObj)) {
    message += OLD_VERSION_MESSAGE;
  }
  //  Проверка на пустые поля в новых версиях
    message += constructMessageBlanks(findBlanks(reqObj));


  if (!validateEmail(reqObj.customer.email)) {
    message += INVALID_EMAIL_MESSAGE;
  }
  return message;
}




