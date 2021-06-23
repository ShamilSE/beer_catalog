import {React} from "react";
import {Modal} from "react-bootstrap";
import {useFormik} from "formik";

function RegisterPopUp(props) {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            birthday: '',
            password: '',
            email: '',
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
        <Modal.Dialog className={"register-form"}>
            <Modal.Header closeButton>
                <Modal.Title>Register Form</Modal.Title>
            </Modal.Header>

            <form onSubmit={formik.handleSubmit} className={"register-form"}>

                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full name</label>
                    <input
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        type="fullName"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                    />
                    <p style={{color: 'red'}}>{formik.errors.fullName}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input
                        className="form-control"
                        id="birthday"
                        name="birthday"
                        type="birthday"
                        onChange={formik.handleChange}
                        value={formik.values.birthday}
                    />
                    <p style={{color: 'red'}}>{formik.errors.birthday}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p style={{color: 'red'}}>{formik.errors.email}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p style={{color: 'red'}}>{formik.errors.password}</p>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </Modal.Dialog>
    )
}

export {RegisterPopUp}
