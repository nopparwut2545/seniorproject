'use client';
import React, { useEffect, useState } from 'react';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import styles from '../../../styles/Chat.module.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

var stompClient: Client | null = null;

type ChatMessage = {
  senderName?: string; // The '?' makes the property optional
  status: string;
  message?: string;
  receiverName?: string;
};

type UserData = {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
};


type Customer = {
  id: number;
  username: string;
  email: string;
  pass_word: string;
  district: string;
  sub_district: string;
  province: string;
  zip_code: string;
  street_number: string;
  contact_number: string;
  first_name: string;
  last_name: string;
  role: string;
  age: number;
  gender: string;
};

type Role = 'USER' | 'ADMIN' |'NANNY' ;

type DecodedToken = {
  sub: string;
  exp: number;
  a: Role[];
};

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(new Map());
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>('CHATROOM');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });

  useEffect(() => {
    // Once the customer data is fetched, update the userData state.
    if (customer) {
      setUserData(prevUserData => ({
        ...prevUserData,
        username: customer.username
      }));
      console.log('useEffect:'+customer.username);
    }
  }, [customer])

  const handleFileSelect = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await axios.post('http://localhost:9000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Here you can use the response to send the file URL to the chat
        const imageUrl = response.data; // Assuming the server returns the URL of the uploaded image
        sendMessageWithImage(imageUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const sendMessageWithImage = (imageUrl:any) => {
    // You would need to define how you want to handle sending the image URL in a message
    // This could involve modifying your ChatMessage type to include an image property
    var chatMessage = {
      senderName: userData.username,
      message: imageUrl,
      status: 'IMAGE' // A new status to indicate this is an image message
    };
    // Send this message the same way you send other messages
    stompClient?.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const connect = (username: string) => {
    let Sock = new SockJS('http://localhost:9000/ws');
    stompClient = over(Sock);
    stompClient.connect({}, () => {
      onConnected(username);
    }, onError);
  };

  const onConnected = (username: string) => {
    setUserData({ ...userData, username, connected: true });
    stompClient?.subscribe('/chatroom/public', onMessageReceived);
    stompClient?.subscribe(`/user/${username}/private`, onPrivateMessage);
    userJoin(username);
  };

  const userJoin = (username: string) => {
    let chatMessage: ChatMessage = {
      senderName: username,
      status: 'JOIN'
    };
    stompClient?.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload: any) => {
    var payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName || '')) {
          privateChats.set(payloadData.senderName || '', []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        if (payloadData.message) {
          setPublicChats([...publicChats, payloadData]);
        }
        break;
    }
  };

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData: ChatMessage = JSON.parse(payload.body);
    if (payloadData.senderName) {
      let newList = privateChats.get(payloadData.senderName) || [];
      newList.push(payloadData);
      setPrivateChats(new Map(privateChats.set(payloadData.senderName, newList)));
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleMessage = (event: any) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE'
      };
      console.log(chatMessage);
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE'
      };

      if (userData.username !== tab) {
        let chats = privateChats.get(tab);
        if (chats) {
          chats.push(chatMessage);
        } else {
          chats = [chatMessage];
        }
        setPrivateChats(new Map(privateChats.set(tab, chats)));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event: any) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  

  useEffect(() => {
    const token = localStorage.getItem('jwt');
  
    // Decode the JWT to extract user ID
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);

  
      // Extract user ID from the "sub" key in JWT
      const userId = decodedToken.sub;
  
      if (!userId) {
        setError("User ID not found in token.");
        setLoading(false);
        return;
      }
  
      console.log("User ID:", userId);


      if (decodedToken.a.includes('USER')) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:9000/api/customers/${userId}`);
            setCustomer(response.data);
            connect(response.data.username); // Connect using the username from the fetched customer data
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }
      if (decodedToken.a.includes('NANNY')) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:9000/api/nannies/getby/${userId}`);
            setCustomer(response.data);
            connect(response.data.username); // Connect using the username from the fetched customer data
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }

      if (decodedToken.a.includes('ADMIN')) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:9000/api/admins/${userId}`);
            setCustomer(response.data);
            connect(response.data.username); // Connect using the username from the fetched customer data
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }
     
    } else {
      setError('No token found.');
      setLoading(false);
    }
  }, []);
  
  return (
    <div className={styles.container}>

        <div className={styles.chatBox}>
          <div className={styles.memberList}>
            <ul>
            {Array.from(privateChats.keys()).map((name, index) => (
  <li onClick={() => { setTab(name); }} className={`${styles.member} ${tab === name && styles.active}`} key={index}>{name}</li>
))}
            </ul>
          </div>
          {tab === 'CHATROOM' && <div className={styles.chatContent}>
            <ul className={styles.chatMessages}>
              {publicChats.map((chat, index) => (
                <li className={`${styles.message} ${chat.senderName === userData.username && styles.self}`} key={index}>
                  {chat.senderName !== userData.username && <div className={styles.avatar}>{chat.senderName}</div>}
                  <div className={styles.messageData}>{chat.message}</div>
                  {chat.senderName === userData.username && <div className={`${styles.avatar} ${styles.self}`}>{chat.senderName}</div>}
                </li>
              ))}
            </ul>
            <div className={styles.sendMessage}>
              <input type="text" className={styles.inputMessage} placeholder="Enter the message" value={userData.message} onChange={handleMessage} />
              <button type="button" className={styles.sendButton} onClick={sendValue}>Send</button>
            <input type="file" onChange={handleFileSelect} />
        <button type="button" onClick={uploadImage}>Upload Image</button>
            </div>
          </div>}
          {tab !== 'CHATROOM' && (
            <div className={styles.chatContent}>
              <ul className={styles.chatMessages}>
                {[...(privateChats.get(tab) || [])].map((chat, index) => (
                  <li className={`${styles.message} ${chat.senderName === userData.username && styles.self}`} key={index}>
                    {chat.senderName !== userData.username && <div className={styles.avatar}>{chat.senderName}</div>}
                    <div className={styles.messageData}>{chat.message}</div>
                  </li>
                ))}
              </ul>
              <div className={styles.sendMessage}>
                <input type="text" className={styles.inputMessage} placeholder="Enter the message" value={userData.message} onChange={handleMessage} />
                <button type="button" className={styles.sendButton} onClick={sendPrivateValue}>Send</button>
                <input type="file" onChange={handleFileSelect} />
        <button type="button" onClick={uploadImage}>Upload Image</button>
              </div>
            </div>
          )}
        </div>
  
    </div>
  );
};

export default ChatRoom;