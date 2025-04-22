import { useState } from "react";

export const UserForm = () => {

    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    
    const onChange = (e) => {
        setUser(e.target.value)
    }

    const onClick = () => {
        setShow(true)
    }


    return (
        <div>
            <input 
                value={user}
                placeholder="Input your name"
                onChange={onChange}
            />
            <button onClick={onClick}>Submit</button>
            {show && <p>{user}</p>}
        </div>
    );
}