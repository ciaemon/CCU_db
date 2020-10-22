/**
* Field names
*/
const reqNames = {
    customer: {
      name: 'ФИО заказчика', 
      supervisor: 'ФИО отв. лица',
      project: '№ проекта',
      institution: 'Организация',
      lab: 'Лаборатория',
      room: 'комната(корпус)',
      phone: 'вн.тел.',
      email: 'email'
  },
    operator: 'Оператор',
    structureSolver: 'Структурщик',
    crystallographer: 'Кристаллохимик',
    comment: 'Комментарий',
    version: 'версия',
    probe: {
        date: 'Дата подачи',
        cifer: 'шифр',
        knownCells: 'известные ячейки',
        desiredCells: 'желаемые ячейки',
        container: 'тара',
        appearance: 'вид',
        solvent: 'растворители',
        contents: 'состав',
        presentation: 'предоставление пробы',
        storing: 'хранение пробы',
        presence: 'присутствие заказчика',
    },
    task: {
        preparation: 'E16',
        microscopy: 'E17',
        sampling: 'E18',
        photo: 'E19',
        preExp: 'E20',
        preExpTemp: 'F20',
        diffDescription: 'E21',
        strategy: 'E22',
        exp: 'E23',
        expTemp: 'F23',
        reduction: 'E24',
        solution: 'E25',
        deposition: 'E26',
        storing: 'E27'
    },
    experiment: {
        date: 'I2',
        startTime: 'I3',
        endTime: 'I4',
        instrument: 'I5',
        operator: 'I6',
        samplesNumber: 'I7',
        result: 'I9',
        toCustomer: 'I10',
        crystallographer: 'I11',
        folder: 'I12',
        storing: 'I13'
    },
};
/**
* Field cell coordinates
*/
const req = {
    customer: {
      name: 'C2', 
      supervisor: 'C3',
      project: 'C4',
      institution: 'C5',
      lab: 'C6',
      room: 'C7',
      phone: 'C8',
      email: 'C9'
  },
    operator: 'C13',
    structureSolver: 'C14',
    crystallographer: 'C15',
    comment: 'C17',
    version: 'B26',
    probe: {
        date: 'E2',
        cifer: 'E3',
        knownCells: 'E5',
        desiredCells: 'E6',
        container: 'E8',
        appearance: 'E9',
        solvent: 'E10',
        contents: 'E11',
        presentation: 'E12',
        storing: 'E13',
        presence: 'E14',
    },
    task: {
        preparation: 'E16',
        microscopy: 'E17',
        sampling: 'E18',
        photo: 'E19',
        preExp: 'E20',
        preExpTemp: 'F20',
        diffDescription: 'E21',
        strategy: 'E22',
        exp: 'E23',
        expTemp: 'F23',
        reduction: 'E24',
        solution: 'E25',
        deposition: 'E26',
        storing: 'E27'
    },
    experiment: {
        date: 'I2',
        startTime: 'I3',
        endTime: 'I4',
        instrument: 'I5',
        operator: 'I6',
        samplesNumber: 'I7',
        result: 'I9',
        toCustomer: 'I10',
        crystallographer: 'I11',
        folder: 'I12',
        storing: 'I13'
    },
};


function parseSheet(sheet, obj) {
    let result = {};
    for (let key in obj) {
      let cell = obj[key];
        switch (typeof cell) {
            
            case 'string':
                result[key] = sheet.getRange(cell).getDisplayValue();
                break;
            case 'object':
                result[key] = parseSheet(sheet, cell);
                break;
            default:
                console.log('Unknown cell type');
                break;
        }
    }
    return result;
}
/**
 * Parse to request object from Spreadsheet Id
 * */
function parseById(id) {
  const sheet = SpreadsheetApp.openById(id).getSheets()[0];
  let obj = parseSheet(sheet, req);
  obj.id = id;
  return obj;
}




