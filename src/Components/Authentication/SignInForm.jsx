import React from 'react'
import Container from '@mui/material/Container'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string().required("password is required")
})
const SignInForm = () => {

    const formik = useFormik({
        initialValues: {
            email: "", password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("form values", values);
        }
    })
    return (
        <form action="">

            <Grid comtainer spacing={2} >
                <Grid item xs={12} >
                    <TextField fullWidth
                        label="Email"
                        name='email'
                        variant='outline'
                        size='large'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField fullWidth
                        label="Password"
                        name='password'
                        variant='outline'
                        size='large'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default SignInForm