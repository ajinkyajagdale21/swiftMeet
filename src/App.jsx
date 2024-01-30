import "./App.css";
import "@livekit/components-styles";
import {
    ControlBar,
    LiveKitRoom,
    RoomAudioRenderer,
} from "@livekit/components-react";

import { MyVideoConference } from "./components/MyVideoConference";
import { useEffect, useState } from "react";
import { getMeetToken } from "./services/api";
import Cookies from "js-cookie";
import { Navbar } from "./components/navbar/Navbar";
import { HeroComponent } from "./components/heroComponent/HeroComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { MeetupForm } from "./components/meetupForm/MeetupForm";
import styles from "./generalStyles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const serverURL = import.meta.env.VITE_SERVER_URL;

function App() {
    const { user, isAuthenticated, isLoading,loginWithRedirect } = useAuth0();
    const [meetingView, setMeetingView] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                toast.success(`Welcome ${user.name}`);
            } else {
                toast.warning("please login to continue");
            }
        }
    }, [isAuthenticated, isLoading]);

    return (
        <>
            <Navbar setMeetingView={setMeetingView}/>

            {isAuthenticated ? (
                <>
                    {meetingView ? (
                        <LiveKitRoom
                            video={true}
                            audio={true}
                            token={Cookies.get("meetToken")}
                            connectOptions={{ autoSubscribe: false }}
                            serverUrl={serverURL}
                            data-lk-theme="default"
                            style={{ height: "100vh" }}
                        >
                            <MyVideoConference />
                            <RoomAudioRenderer />
                            <ControlBar />
                        </LiveKitRoom>
                    ) : (
                        <div className={`${styles.formContainer}`}>
                            <MeetupForm setMeetingView={setMeetingView} />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="d-flex justify-content-center">
                        <HeroComponent />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="genralButtons" onClick={()=>loginWithRedirect()}>Get started</button>
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    );
}

export default App;
