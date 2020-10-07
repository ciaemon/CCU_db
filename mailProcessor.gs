function getExcelAttachments() {
  var threads = GmailApp.search('filename:xlsx has:attachment is:unread');
  for (i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (j = 0; j < messages.length; j++) {
      var attachments = messages[j].getAttachments();
      for (k = 0; k < attachments.length; k++) {
        var file = importExcel(attachments[k]);
        file.setDescription(messages[j].getFrom())
      }
    }
    threads[i].markRead();
    threads[i].moveToArchive();
  }
}






function unreadAttachment() {
  if (GmailApp.getInboxUnreadCount() == 0) {
    return 0; 
  } else {
    var thread = GmailApp.getInboxThreads(0, 1)[0];
    var messages = thread.getMessages();
    for (i = 0; i < messages.length; i++) {
      if (!messages[i].isUnread()) { continue; }
      var attachments = messages[i].getAttachments();
      for (j = 0; j < attachments.length; j++) {
        importExcel(attachments[j]);
      }
    }
    thread.markRead().moveToArchive();
    unreadAttachment();
  }
}

function importExcel(attachment) {
  if (attachment.setContentTypeFromExtension().getContentType() == MimeType.MICROSOFT_EXCEL) {
    var destFolder = DriveApp.getFolderById('1wBR0VGLshTd9ocFfEvvAa3pdsejeUFeq');
    return destFolder.createFile(attachment);
    
  }
}