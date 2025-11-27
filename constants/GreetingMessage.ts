export const greetingMessage = {
  first: {
    title: 'Hi There!',
    message: 'Thanks for visiting my space!',
  },
  withinAWeek: {
    title: 'Welcome Back!',
    message: 'Glad to see you again so soon!',
  },
  afterAWeek: {
    title: 'Long Time No See!',
    message: 'So happy you came back!',
  },
};

export type greetingMessageType = keyof typeof greetingMessage;
