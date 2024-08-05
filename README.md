## Chat Widget

### Bundling and Deployment

So to get this app onto our clients sites we need to bundle it and then deploy the bundle to a server. Then our clients can just pull the bundle from the server and include it in their site.

1) Run the `npm run build:widget` command. This will create two files in the 'widget' directory.
2) Deploy those files to a server.
3) Include the following code in your site:

```html
<!-- The widget will look for a div with this class and render itself there -->
<div class='agent-artificial-chat-widget'></div>
<script src="https://YOUR_HOST_URL/widget/index.css"></script>
<script src="https://YOUR_HOST_URL/widget/index.js"></script>
```

### Themeing and Customization

TODO: Add a parameter to the App() function that will allow us to pass in a key on initialization.

This key will allow us to prevent unauthroized access to the widget. It will also allow us to customize the widget for each client.
For this to work on the backend we will need a config object json file that can be retrieved using the key. This config object will contain the following:

(Working Copy, not representative of final config object)
```json
{
  "theme": {
    "primaryColor": "#000000",
    "secondaryColor": "#ffffff",
    "accentColor": "#ff0000"
  },
  "chat": {
    "title": "Chat",
    "subtitle": "Subtitle",
    "senderPlaceHolder": "Type a message...",
    "profileAvatar": "./public/user.svg",
    "profileClientAvatar": "./public/Avatar.webp",
    "showTimeStamp": true,
  },
  "api": {
    "endpoint-or-hoever-we-differentiat-clients": "https://your-server.com/api"
  }
}
```
