import {React, useState} from "react";
import {Modal, Button} from "react-bootstrap";
import {passwordValidation, fullNameValidation} from "./utils/formValidation";
import {useFormik} from "formik";

function RegisterPopUp(props) {
    const [fullName, setFullName] = useState("Enter full name")
    const [birthday, setBirthday] = useState(undefined)
    const [post, setPost] = useState(undefined)
    const [username, setUserName] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const [isFullNameValid, setIsFullNameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
        },
        validate: validate,
        onSubmit: values => {alert(JSON.stringify(values, null, 2))}
    })

    function validate(values) {
        let errors = {}
        if (!values.email)
            errors.email = 'Required';
        return errors;
    }

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
        fullNameValidation(fullName) ? setIsFullNameValid(true) : setIsFullNameValid(false)
        console.log("is full name valid? " + isFullNameValid)
    }

    function onPasswordInputChange(event) {
        setPassword(event.target.value)
        passwordValidation(password) ? setIsPasswordValid(true) : setIsPasswordValid(false)
        console.log("is password valid? " + isPasswordValid)
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
                            <input type="text" value={fullName} onChange={(event) => onFullNameInputChange(event)}/>
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
                            <input type="password" value={password} onChange={(event) => onPasswordInputChange(event)}/>
                        </label>
                    </fieldset>
                    <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary" type="submit" disabled>Register</Button>
                    </Modal.Footer>
                </Modal.Body>
            </form>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <label htmlFor="fullName">Full name</label>
                <input
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.email}
                <button type="submit">Submit</button>
            </form>
        </Modal.Dialog>
    )
}

export {RegisterPopUp}
