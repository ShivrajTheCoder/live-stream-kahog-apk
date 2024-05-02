import React, { createContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
//   const [audio,setAudio] = useState({ title:"lsdfsfs", id: "lsdfds" });
  const [audio,setAudio] = useState({ title:null, id: null });
  // const [user, setUser] = useState({ id: null, token: null });

  const startPlay = (id, title) => {
    setAudio({ id, title });
  };

  const stopPlay = () => {
    setAudio({ title:null, id: null });
  };

  return (
    <AudioContext.Provider value={{ audio, startPlay,stopPlay }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
