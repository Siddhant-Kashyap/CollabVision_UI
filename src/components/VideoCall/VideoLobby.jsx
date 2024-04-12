import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const VideoLobby = () => {
  const [callerEmail, setCallerEmail] = useState(localStorage.getItem("email"));
  const [room, setRoom] = useState();
  const socket = useSocket();
  const navigate = useNavigate();

  // const [reciverEmail,setreciverEmail]= useState("")
  // const handleChange=(e)=>{
  //   setreciverEmail(e.target.value)

  // }
  const handleSend = useCallback(() => {
    socket.emit("room:join", { callerEmail, room });
  }, [callerEmail, room, socket]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { callerEmail, room } = data;
      navigate(`/room/${room}`);
      console.log(data);
    },
    [navigate]
  );
  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="p-20 text-center w-2/4 min-h-2/4 border shadow-custom rounded-2xl">
        
        <FontAwesomeIcon beatFade icon={faVideo} style={{ color: 'white',fontSize:'2em' }} />

          

          <h1 className="text-2xl mt-3 text-orange-500 font-proteststrike">
            Create Video Call
          </h1>
          <br />
          <p className="text-xl text-orange-400 font-kodemono">
            Enter your Room number{" "}
          </p>
          <br />
          <input
            type="number"
            name="room"
            onChange={handleRoom}
            value={room}
            placeholder="Enter the Room Number"
            className=" bg-slate-500 w-full md:w-2/3 lg:w-1/2 rounded-md h-9 text-center"
          />
          <br />
          <br />
          {/* <input type="text" name="email" onChange={handleChange}  value={reciverEmail} placeholder="Enter email to invite.. example@ex.com" className=" bg-slate-500 w-full md:w-2/3 lg:w-1/2 rounded-md h-9 text-center"/> */}
          <br />

          <button
            type="button"
            onClick={handleSend}
            className=" mt-8 text-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Go to Room
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoLobby;
