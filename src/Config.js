let config = {
  google: {
    'apiKey': process.env.GOOGLE_API_KEY,
    'clientId': '623229342479-jp9fov4q9okpla9112005q46fqlst4h4.apps.googleusercontent.com',
    'scope': [
    'openid',
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.file',
    ].join(' '),
    'discoveryDocs': [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://sheets.googleapis.com/$discovery/rest?version=v4'
    ]
  },
};

export default config;
