import {React} from "react";
import {Modal} from "react-bootstrap";
import {useFormik} from "formik";

function RegisterPopUp(props) {
    const formik = useFormik({
        initialValues: {
            fullName: null,
            birthday: null,
            password: null,
            email: null,
        },
        validate: validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            props.onClick()
        }
    })

    function validate(values) {
        let errors = {}
        if (!values.birthday)
            errors.birthday = 'required'
        if (!values.email)
            errors.email = 'required'
        if (!values.fullName)
            errors.fullName = 'required'
        if (!values.password)
            errors.password = 'required'
        if (values.password && values.password.length < 6)
            errors.password = 'password must have at least 6 characters'
        return errors;
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton onClick={() => props.onClick()}>
                <Modal.Title>Register Form</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="fullName">Full name</label>
                <input
                    style={{display: 'inherit'}}
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <p style={{color: 'red'}}>{formik.errors.fullName}</p>
                <label htmlFor="birthday">birthday</label>
                <input
                    style={{display: "inherit"}}
                    id="birthday"
                    name="birthday"
                    type="birthday"
                    onChange={formik.handleChange}
                    value={formik.values.birthday}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    style={{display: 'inherit'}}
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p style={{color: 'red'}}>{formik.errors.email}</p>
                <label htmlFor="password">Password</label>
                <input
                    style={{display: 'inherit'}}
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{color: 'red'}}>{formik.errors.password}</p>
                <button type="submit">Submit</button>
            </form>
        </Modal.Dialog>
    )
}

export {RegisterPopUp}
