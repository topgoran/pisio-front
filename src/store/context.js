import { createContext, useState } from 'react'

const ConferenceContext = createContext({
    userId: "",
    username: "",
    userType: "",
    addUser: (userId, username, userType) => {},
    removeUser: () => {},
    isLoggedIn: () => {}
});

export function ConferenceContextProvider(props) {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [userType, setUserType] = useState(localStorage.getItem("userType"));

    function addUserHandler(userId, username, userType) {
        setUserId(userId);
        localStorage.setItem("userId", userId);
        setUsername(username);
        localStorage.setItem("username", username);
        setUserType(userType);
        localStorage.setItem("userType", userType);
    }

    function removeUserHandler(){
        setUserId("");
        localStorage.setItem("userId", "");
        setUsername("");
        localStorage.setItem("username", "");
        setUserType("");
        localStorage.setItem("userType", "");
    }

    function isLoggedInHandler(){
        if(username === "" || username === null){
            return false;
        }
        return true;
    }

    const context = {
        userId: userId,
        username: username,
        userType: userType,
        addUser: addUserHandler,
        removeUser: removeUserHandler,
        isLoggedIn: isLoggedInHandler
    };

    return <ConferenceContext.Provider value={context}>
        {props.children}
    </ConferenceContext.Provider>
}

export default ConferenceContext;
