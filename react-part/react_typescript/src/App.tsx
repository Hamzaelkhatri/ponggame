import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import "./index.css";
// import { Game } from './Game';
import Canvas from './Canvas';
import { useState } from 'react';



type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};


export default function App() {

  const { register, handleSubmit } = useForm<FormValues>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showTtile, setTtile] = useState(true);
  const [CanvasTitle, setCanvasTitle] = useState(false);
  const [datas, setData] = useState({ Id: "hello", Name: "hello", Email: "" });
  const Bsocket : Socket = io('http://localhost:3600');
  
  if (window.sessionStorage.getItem("email") !== null) {
    Bsocket.emit("connectServer",{ p1:window.sessionStorage.getItem("email"), p2:window.sessionStorage.getItem("inviter")});
    return (

      <div className="App">
        <Canvas />

      </div>

    );
  }

  let T

  //initial WebSocketServer 
  const socket = io('http://localhost:3600');
  // console.log(window.sessionStorage.getItem("email"));

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    window.sessionStorage.setItem("email", data.email);
    window.sessionStorage.setItem("inviter", data.lastName);
    Bsocket.emit("connectServer", data.email);
    setData({ Id: data.firstName, Name: data.lastName, Email: data.email });
    setShowForm(false);
    setShowCanvas(true);
    setTtile(false);
    setCanvasTitle(true);
    socket.emit('msgToServer', data);
  }

  return (

    <div className="App">
      {/* <center> */}
      {showTtile
        && <h1>Ping Pong Player - Registration</h1>
      }
      {CanvasTitle && <h1>Ping Pong Player - Canvas</h1>}
      {showForm &&
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label>First Name</label>
            <input {...register("firstName")} />
          </div>

          <div>
            <label>Last Name</label>
            <input {...register("lastName")} />
          </div>

          <div>
            <label>Email</label>
            <input {...register("email")} type="email" />
          </div>

          <input type="submit" />
        </form>
      }
      {/* {CanvasTitle && <h1>Ping Pong Player - Canvas</h1>} */}



      {/* {} */}
      {showCanvas && <Canvas data={datas.valueOf()} />}

      {/* </center> */}
    </div>

  );
}

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// // import { useRef, useEffect } from 'react'
// // import { Socket, io } from 'socket.io-client';
// import "./index.css";
// // import {Game} from './Game';
// import Canvas from './Game';

// type FormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
// };

// export default function App() {
//   const { register, handleSubmit } = useForm<FormValues>();


//   return (
//     <div className="App">
//       <h1>Ping Pong Player - Registration</h1>
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div>
//           <label>First Name</label>
//           <input {...register("firstName")} />
//         </div>

//         <div>
//           <label>Last Name</label>
//           <input {...register("lastName")} />
//         </div>

//         <div>
//           <label>Email</label>
//           <input {...register("email")} type="email" />
//         </div>

//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
