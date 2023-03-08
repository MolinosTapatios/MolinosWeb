import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion";
import './index.css'
import io from 'socket.io-client'

const socket = io('/')

function ChatBox({data=[]}) {
    return(
        <>
            {
                data.map((m,i)=>
                    <Mensaje body={m.body} from={m.from} key={i} />
                )
            }
        </>
    )
}

function Mensaje({from, body}) {
    return(
        <>
            {
                from === 'Me'
                    ?
                    <div style={{backgroundColor:'red'}}>{body}</div>
                    :
                    <div style={{backgroundColor:'green'}}>{body}</div>
            }
        </>
    )
}

function Chat() {

    // const [estado, setEstado] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [mensajes, setMensages] = useState([{from:'Me',body:'Hola puñetas'}]);

    const refMessage = useRef()

    const handleIsOpen = () => setIsOpen(!isOpen)

    useEffect(() => {
        const receiveMessage = (message) => {
          setMensages([...mensajes,message]);
        };
    
        socket.on("message", receiveMessage);
    
        return () => {
          socket.off("message", receiveMessage);
        };
      }, [mensajes]);
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
          body: refMessage.current.value,
          from: "Me",
        };
        setMensages([...mensajes,newMessage]);
        console.log("se agrego el mensaje",{mensajes})
        refMessage.current.value = ""
        socket.emit("message", newMessage.body);
      };


    return (
        <>
            <motion.div
                layout
                className={!isOpen ? 'chat-icon' : 'chat-container'}
            >
                {
                    isOpen
                        ?
                        <>
                            <div className="wrapper">
                                <section className="chat-area">
                                    <header>
                                        <img src="http://192.168.1.69/server/img/null.jpg" alt="" />
                                        <span className="back-icon" onClick={handleIsOpen}><i className="bi bi-x-lg"></i></span>

                                    </header>
                                    <div className="chat-box">
                                        <ChatBox data={mensajes} />
                                    </div>
                                    <form onSubmit={handleSubmit} className='typing-area'>
                                        <input type="text" ref={refMessage} className="input-field" placeholder="Type a message here..." autoComplete="off" />
                                        <button><i className="bi bi-send"></i></button>
                                    </form>
                                </section>
                            </div>
                            {/* <button onClick={handleIsOpen} >Close</button> */}
                        </>
                        :
                        <>
                            <span className="chat-badge">1</span>
                            <h2 onClick={handleIsOpen}><i className="bi bi-chat-text"></i></h2>
                        </>
                }
            </motion.div>
        </>
    )
}

export default Chat