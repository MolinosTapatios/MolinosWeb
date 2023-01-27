import { useState } from "react";

function Chats(params) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if(username !== "" && room !== ""){

        }
    }

    return (
        <div>
            <h3>Join A Chat</h3>
            <input type="text" placeholder="John..." onChange={(event)=>{setUsername(event.target.value);}}/>
            <input type="text" placeholder="Room ID..." onChange={(event)=>{setRoom(event.target.value)}}/>
            <button onClick={joinRoom}>Join A Room</button>
        </div>
    );  
}

export default Chats;