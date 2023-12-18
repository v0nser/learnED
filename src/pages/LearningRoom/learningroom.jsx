import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import axios from 'axios';
import 'plyr/dist/plyr.css';
import 'plyr/dist/plyr.polyfilled';
import { useParams } from 'react-router-dom';
import './learningroom.css';

function extractYouTubeVideoId(url) {
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const LearningRoom = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (id) {
      const fetchVideoUrl = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/courses/${id}`);
          console.log('Video URL:', response.data.VideoURL);
          setVideoUrl(response.data.VideoURL);
          
          // Extract video ID from the URL
          const idFromUrl = extractYouTubeVideoId(response.data.VideoURL);
          setVideoId(idFromUrl);
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
      };

      fetchVideoUrl();
    }
  }, [id]);

  useEffect(() => {
    if (videoId) {
      try {
        // Initialize Plyr when the component mounts
        const player = new Plyr(videoRef.current, {
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
          youtube: { noCookie: true, rel: 0, showinfo: 0 },
        });

        // Log Plyr events for debugging
        player.on('setup', () => console.log('Plyr setup complete'));
        player.on('error', (event) => console.error('Plyr error:', event));

        // Cleanup Plyr when the component unmounts
        return () => {
          if (player) {
            player.destroy();
          }
        };
      } catch (error) {
        console.error('Error initializing Plyr:', error);
      }
    }
  }, [videoId]);

  return (
    <div className="learning-room">
      <div className="video-container">
        {/* Use the dynamically fetched YouTube embed URL */}
        {videoId && (
          <div data-plyr-provider="youtube" data-plyr-embed-id={videoId}>
            <iframe
              class="video-player"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
              allowTransparency
              allow="autoplay"
              title="YouTube Video"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningRoom;
