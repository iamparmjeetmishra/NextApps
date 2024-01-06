'use client'
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

function VideoPage() {
    return (
        <>
            <MediaPlayer playsinline title="Sprite Fight" src={'https://www.youtube.com/watch?v=BeZ64_v7Di4'} >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
        </>
    );
}

export default VideoPage