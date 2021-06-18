import {React, useState} from "react";
import {Modal, Button} from "react-bootstrap";
import { fullNameValidation} from "./utils/formValidation";

function RegisterPopUp(props) {
    const [fullName, setFullName] = useState()
    const [birthday, setBirthday] = useState()
    const [post, setPost] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const [isFullNameValid, setIsFullNameValid] = useState(false)

    function sendForm(event) {
        event.preventDefault()
        alert("form has sent")
        console.log(fullName)
        console.log(birthday)
        console.log(post)
        console.log(username)
        console.log(password)
    }

    function onFullNameInputChange(event) {
        setFullName(event.target.value)
        fullNameValidation(event.target.value) ? setIsFullNameValid(true) : setIsFullNameValid(false)
        console.log(isFullNameValid)
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton onClick={() => props.onClick()}>
                <Modal.Title>Register Form</Modal.Title>
            </Modal.Header>
            <form onSubmit={sendForm}>
                <Modal.Body>
                    <fieldset>
                        <label>
                            <p>full name</p>
                            <input type="text"  onChange={(event) => onFullNameInputChange(event)}/>
                        </label>
                        <label>
                            <p>birthday</p>
                            <input type="text" onChange={(event) => setBirthday(event.target.value)}/>
                        </label>
                        <label>
                            <p>post</p>
                            <input type="text" onChange={(event) => setPost(event.target.value)}/>
                        </label>
                        <label>
                            <p>username</p>
                            <input type="text" onChange={(event) => setUserName(event.target.value)}/>
                        </label>
                        <label>
                            <p>password</p>
                            <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                        </label>
                    </fieldset>
                    <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary" type="submit" disabled>Register</Button>
                    </Modal.Footer>
                </Modal.Body>
            </form>
        </Modal.Dialog>
    )
}

export {RegisterPopUp}
