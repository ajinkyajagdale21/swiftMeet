import React from 'react'
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from 'livekit-client';
import {
  GridLayout,
  ParticipantTile,
} from '@livekit/components-react';


export const MyVideoConference = () => {
    const tracks = useTracks(
        [
          { source: Track.Source.Camera, withPlaceholder: true },
          { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
      );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
    <ParticipantTile />
    {/* <DisconnectButton /> */}
    </GridLayout>
  )
}
