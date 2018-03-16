var google = require('googleapis');
var youtube = google.youtube('v3');
var ResumableUpload = require('node-youtube-resumable-upload');

var authClient = new google.auth.JWT(
  'plataforma@api-project-1011506978456.iam.gserviceaccount.com',
  'youtube.pem',
  null,
  ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.upload'],
  null
);

console.log(authClient)
authClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  upload(tokens)
});


var upload = function(tokens) {
  var metadata = {snippet: { title: 'New Upload', description: 'Uploaded with ResumableUpload' },
      status: { privacyStatus: 'private' }};
  var resumableUpload = new ResumableUpload(); //create new ResumableUpload
  resumableUpload.tokens	= tokens;
  resumableUpload.filepath	= './video.mp4';
  resumableUpload.metadata	= metadata;
  resumableUpload.monitor	= true;
  resumableUpload.retry		= -1;  //infinite retries, change to desired amount
  resumableUpload.upload();
  resumableUpload.on('progress', function(progress) {
	console.log(progress);
  });
  resumableUpload.on('error', function(error) {
	console.log(error);
  });
  resumableUpload.on('success', function(success) {
	  console.log(success);
  });
}