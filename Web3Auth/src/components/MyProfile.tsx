import React from 'react';



interface MyProfileProps {
  loggedIn: boolean;
  getUserInfo: () => void;
  getAccounts: () => void;
  getBalance: () => void;
  signMessage: () => void;
  sendTransaction: () => void;
  logout: () => void;
  customSignedMessage: (message: string) => Promise<void>;
}

const MyProfile: React.FC<MyProfileProps> = ({
  loggedIn, 
  getUserInfo, 
  getAccounts, 
  getBalance, 
  signMessage, 
  sendTransaction,
  customSignedMessage, 
  logout
}) => {
  const loggedInView = (
    <div className="flex-container">
      <button onClick={getUserInfo} className="card">Get User Info</button>
      <button onClick={getAccounts} className="card">Get Accounts</button>
      <button onClick={getBalance} className="card">Get Balance</button>
      <button onClick={signMessage} className="card">Sign Message</button>
      <button onClick={sendTransaction} className="card">sendTransaction</button>
      <button onClick={() => customSignedMessage("Hello")} className="card">customSignesMessage</button>
      <button onClick={logout} className="card">Log Out</button>
    </div>
  );

  return (
    <div>
      <h1>MyProfile</h1>
      <p>Here are some of our favorite games:</p>
      {loggedIn ? loggedInView : <p>Please log in to see more options.</p>}
    </div>
  );
};

export default MyProfile;
