
function sendEmail(_cleanup) {

  console.log("Sending email...");

  var screenshotFilePath;

  navigator.screenshot.save(function (error, res) {
    if (error) {
      console.error(error);
    } else {
      screenshotFilePath = res.filePath;
      console.log('saved file: ' + screenshotFilePath);

      cordova.plugins.email.open({
        subject: 'Dashboard Screenshot',
        body: 'Hi, here is the screenshot from Dashboard.',
        attachments: "file://" + screenshotFilePath
      });

      _cleanup();

    }
  }, 'jpg', 100);



}
