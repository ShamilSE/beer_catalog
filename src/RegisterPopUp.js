import {React, useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap";
import {formValidation, fullNameValidation} from "./utils/formValidation";

function RegisterPopUp(props) {
    const [fullName, setFullName] = useState()
    const [birthday, setBirthday] = useState()
    const [post, setPost] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [isFormValidated, setIsFormValidated] = useState(false)

    function sendForm(event) {
        event.preventDefault()
    }

    useEffect(() => {
        if (formValidation({fullName, birthday, post, username, password}))
            setIsFormValidated(true)
        else
            setIsFormValidated(false)
        console.log("useEffect")
        // console.log("isFormValidated %i", isFormValidated)
    })

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
                            <input type="text"  onChange={(event) => {
                                setFullName(event.target.value)
                                fullNameValidation()
                            }
                            }/>
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
                        {
                             isFormValidated ?
                            <Button variant="secondary">Close</Button> :
                            <Button variant="secondary">Close</Button>
                        }
                        <Button variant="primary" type="submit">Register</Button>
                    </Modal.Footer>
                </Modal.Body>
            </form>
        </Modal.Dialog>
    )
}

export {RegisterPopUp}
