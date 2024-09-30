import React, { useEffect, useRef } from 'react';
import './JitsiMeetingRoom.css';

const JitsiMeeting = () => {
  const jitsiApiInitialized = useRef(false);

  useEffect(() => {
    const initializeJitsi = () => {
      if (!jitsiApiInitialized.current) {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.onload = () => {
          const domain = 'meet.jit.si';
          const options = {
            roomName: 'PickAnAppropriateMeetingNameHere',
            width: 700,
            height: 700,
            parentNode: document.querySelector('#meet'),
          };

          const api = new JitsiMeetExternalAPI(domain, options);

          // Clean up the Jitsi API instance on component unmount
          return () => {
            api.dispose();
          };
        };

        document.body.appendChild(script);
        jitsiApiInitialized.current = true;
      }
    };

    initializeJitsi();
  }, []);

  return <div id="meet"></div>;
};

export default JitsiMeeting;
