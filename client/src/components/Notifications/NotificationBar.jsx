import { AuthContext } from '@/store/Context';
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const NotificationBar = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);

  const { vendor } = useSelector((state) => state.vendorInfo);
  const { user } = useSelector((state)=>state.userInfo)

  const {
    socket,
    sendNotification,
    recieveNotification,
    setRecieveNotification,
  } = useContext(AuthContext)

  useEffect(() => {
    if(socket.current ==null){
      socket.emit("new-user-add", user?._id);
    }

      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });

    }, [user]);

    useEffect(() => {
      if(socket.current==null){
        socket.emit("new-user-add", vendor?._id);
      }

        socket.on("get-users", (users) => {
          setOnlineUsers(users);
        });

      }, [vendor]);

  useEffect(() => {
    if (sendNotification !== null) {
      socket?.emit("send-notification", sendNotification);
    }
  }, [sendNotification]);

  useEffect(() => {
    socket.on("recieve-notification", (data) => {
        console.log(data,"llll");
      setRecieveNotification(data);
    });
  }, []);

  useEffect(() => {
    if (vendor?._id) {
      if (
        recieveNotification !== null &&
        recieveNotification?.recieverId === vendor?._id
      ) {
        toast.info(`${recieveNotification?.notification}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (user?._id) {
      if (
        recieveNotification !== null &&
        recieveNotification?.recieverId === user?._id
      ) {
        toast.info(`${recieveNotification?.notification}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [recieveNotification]);
    return ( 
        <>
            <ToastContainer />
        </>
     );
}
 
export default NotificationBar;