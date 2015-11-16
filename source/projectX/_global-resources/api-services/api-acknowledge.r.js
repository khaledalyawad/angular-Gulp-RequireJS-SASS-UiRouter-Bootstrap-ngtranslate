'use strict';

define(['projectX/app', 'underscore'], function(app, _) {

  'use strict';
  app.service('apiAcknowledge', ['toaster', 'CONFIG',
    function(toaster, CONFIG) {

      var messageBuilder = function(message){
        var messageText = "";
        var messageType = "Text";
        if( Object.prototype.toString.call( message ) === '[object Array]' ) {
          messageType = "HTML";
        }
        switch(messageType){
          case 'HTML':
            messageText = "<ul>";
            _.forEach(message , function(msg) {
              messageText += "<li>" + msg + "</li>";
            });
            messageText += "</ul>";
            break;
          case 'Text':
            messageText = message;
            break;
        }
        return messageText;
      };

      this.toastSuccess = function(message,title){
        toaster.pop(
          {
            type: "success",
            title: title,
            body: messageBuilder(message),
            bodyOutputType : "trustedHtml"
          }
        );
      };

      this.toastInfo = function(message,title){
        toaster.pop(
          {
            type: "info",
            title: title,
            body: messageBuilder(message),
            bodyOutputType : "trustedHtml"
          }
        );
      };

      this.toastWarning = function(message,title){
        toaster.pop(
          {
            type: "warning",
            title: title,
            body: messageBuilder(message),
            bodyOutputType : "trustedHtml"
          }
        );
      };

      this.toastError = function(message,title){
        toaster.pop(
          {
            type: "error",
            title: title,
            body: messageBuilder(message),
            bodyOutputType : "trustedHtml"
          }
        );
      };


      this.popSuccess = function(message,title){

      };

      this.popInfo = function(message,title){

      };

      this.popWarning = function(message,title){

      };

      this.popError = function(message,title){

      };


      this.alert = function(message){
        alert(JSON.stringify(message));
      };

      this.consoleLog = function(message, type){
        if(type){
          switch (type){
            case "JSON":
              if(CONFIG.isLocal){ console.log('apiAcknowledge', JSON.stringify(message)); }
              break;
            case "OBJECT":
                if(CONFIG.isLocal){console.log('apiAcknowledge', message); }
              break;
          }
        } else {
          if(CONFIG.isLocal){ console.log('apiAcknowledge', message); }
        }
      };

      this.dialog = function(message,title){

      };
    }
  ]);
});
