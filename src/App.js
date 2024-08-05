import { React, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import avatar from '../public/Avatar.webp';
import user from '../public/user.svg'
import 'react-chat-widget/lib/styles.css';
import './App.css';
import axios from 'axios';


// https://github.com/Wolox/react-chat-widget
const config = {
  emojis: false,
  title: 'Chat',
  subtitle: 'Your friendly chatbot',
  senderPlaceHolder: 'Type a message...',
  profileAvatar: avatar,
  profileClientAvatar: user,
  showTimeStamp: true,
  url: 'YOUR_INFERENCE_ENDPOINT',
  model: 'MODEL'
};

const messages = [];

async function setGlobalColor() {
  // TODO: Make call to get config file

  const defaultStyleConfig = {
    headerColor: '#0b225e',
    headerTextColor: '#f5f5f5',
    chatBackgroundColor: '#ffffff',

    systemMessageColor: '#f5f5f5',
    systemMessageTextColor: '#33343a',

    userMessageColor: '#f5f5f5',
    userMessageTextColor: '#33343a',
  }

  const styleConfig = defaultStyleConfig; // configFromServer || defaultConfig;

  const root = document.documentElement;
  root.style.setProperty('--header-color', styleConfig.headerColor);
  root.style.setProperty('--header-text-color', styleConfig.headerTextColor);
  root.style.setProperty('--chat-background-color', styleConfig.chatBackgroundColor);
  root.style.setProperty('--system-message-color', styleConfig.systemMessageColor);
  root.style.setProperty('--system-message-text-color', styleConfig.systemMessageTextColor);
  root.style.setProperty('--user-message-color', styleConfig.userMessageColor);
  root.style.setProperty('--user-message-text-color', styleConfig.userMessageTextColor);
  root.style.setProperty('--background-color', styleConfig.chatBackgroundColor);
  root.style.setProperty('--footer-background-color', styleConfig.footerBackgroundColor);
}

function App() {
  setGlobalColor();

  useEffect(() => {
    addResponseMessage('Hi there, how can I help you?');
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);

    messages.push({
      role: 'user',
      content: newMessage
    });

    const prompt = {
      messages: messages,
      model: config.model,
    };
    let fullMessage = '';
    // Now send the message throught the backend API
    const res = await axios.post(config.url, prompt).then((res) => {
      const rawData = res.data;

      const jsonLines = rawData.split(/\r?\n/);
      for (const chunk of jsonLines) {
        if (chunk) {
          const jsonObj = JSON.parse(chunk)
          console.log(`processing ${chunk}`)
          fullMessage += jsonObj.message.content
        }
      }
      addResponseMessage(fullMessage);
    })// addResponseMessage(res.data.choices.messages[0].content);
      .catch((err) => {
        console.error(err);
        addResponseMessage(`Server error occurred, please try again or contact support.`);
      });
  };

  const handleToggle = () => {
    setTimeout(() => {
      const send = document.getElementsByClassName("rcw-send")[0];

      if (send) {
        send.textContent = "Send";
      }
    }, 10);
  }

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        handleToggle={handleToggle}
        emojis={config.emojis}
        title={config.title}
        subtitle={config.subtitle}
        senderPlaceHolder={config.senderPlaceHolder}
        profileAvatar={config.profileAvatar}
        profileClientAvatar={config.profileClientAvatar}
        showTimeStamp={config.showTimeStamp}
        titleAvatar={config.profileAvatar}
        launcherOpenImg={config.profileAvatar}
        sendButtonAlt="Send"
      />
    </div>
  );
}

export default App;