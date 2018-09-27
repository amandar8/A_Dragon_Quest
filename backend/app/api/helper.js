const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });

      setSessionCookie({ sessionString, res });

      resolve({ message: 'session restored' });
    } else {
      session = new Session({ username });
      sessionString = session.toString();

      AccountTable.updateSessionId({ 
        sessionId: session.id, 
        usernameHash:hash(username) 
      })
      .then(() => {
        setSessionCookie({ sessionString, res });

        resolve({ message: 'session created' });
      })
      .catch(error => reject(error));
    }
  });
}

const setSessionCookie = ({ sessionString, res }) => {
  //sets cookie from reponse object. 
  //browser no longer stores cookie after 1 hour (3,600,000ms)
  //httpOnly flag create secure cookie
  //cookie can only be sent over secure https connections
  res.cookie('sessionString', sessionString, {
  expire: Date.now() + 3600000,
  httpOnly: true
  // secure: true
  });
};

module.exports = { setSession };