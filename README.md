To test prototype ,please do the following -

Go to the final Branch 

#Run the Web3Auth
```
cd Web3Auth 
npm i
npm start
```

Go to this link - https://eth-global-webpage1.vercel.app/

Website consists of 2 Unity games hosted on itch.io and login through web3Auth

- You can buy tokens from Sepolia Eth by the Web3Auth Interface and tokens will get updated in the game (given that you sign with same email id in interface and games).
- You can buy / sell skins to get Tokens and read your skins by the interface.



We have tried using stackr Labs to keep track of user skins in layer 2 (Vulcan) but we were unable to do so in limited time. We were unable to call post requests the actions and transitions in the playground via unity to update the state of blockchain which eventually led to dismissal of the approach.

Current Progress:

- Created Custome State machine.
- Successfully intilaised and deployed a state machine in Layer 2 (Appid: 105 and 112)
- ![Screenshot 2024-09-06 at 10 40 47 PM](https://github.com/user-attachments/assets/62d8ec69-8d3e-4a96-843c-c6d4fda7b44b)
![Screenshot 2024-09-06 at 6 45 05 AM (2)](https://github.com/user-attachments/assets/100263ca-21c4-4529-8af9-a7c05d112b16)
<img width="1512" alt="Screenshot 2024-09-07 at 4 58 48 AM" src="https://github.com/user-attachments/assets/343c2f2d-1dc1-4052-90f9-4b2dd240d9a4">
<img width="1512" alt="Screenshot 2024-09-07 at 4 58 48 AM" src="https://github.com/user-attachments/assets/5a204262-3aac-41d7-98b7-4d780217db65">
<img width="1512" alt="Screenshot 2024-09-07 at 5 00 02 AM" src="https://github.com/user-attachments/assets/0371c7e3-596c-436d-9187-5c86fd2159c8">

