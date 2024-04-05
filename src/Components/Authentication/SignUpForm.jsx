import React, { useEffect } from 'react'
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string().required("password is required")
})

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "Febuary" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
    // { value: 1, label: "January" },
]
const SignUpForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            fullName: "",
            dateOfBirth: {
                day: '',
                month: '',
                year: ''
            }
        },
        validationSchema,
        onSubmit: (values) => {
            const { day, month, year } = values.dateOfBirth;
            const dateOfBirth = `${year}-${month}-${day}`;
            values.dateOfBirth = dateOfBirth;
            console.log("form values", values);
        }
    })
    const handleDateChange = (name) => (event) => {
        console.log(name);
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name]: event.target.value,
        })

    }

    useEffect(() => {
        console.log(formik.values.dateOfBirth);
    }, [formik.values.dateOfBirth])

    return (
        <form onSubmit={formik.handleSubmit}>

            <Grid container spacing={2} >
                <Grid item xs={12} >
                    <TextField fullWidth
                        label="Full Name"
                        name='fullName'
                        variant="outlined"
                        size='large'
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField fullWidth
                        label="Email"
                        name='email'
                        variant="outlined"
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
                        variant="outlined"
                        size='large'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>



                {/* days */}
                <Grid item xs={4} >
                    <InputLabel>Date</InputLabel>
                    <Select fullWidth name="day" value={formik.values.dateOfBirth.day}
                        onChange={handleDateChange("day")}
                        onBlur={formik.handleBlur}
                    >
                        {days.map((day) => <MenuItem key={day} value={day} >{day}</MenuItem>)}
                    </Select>
                </Grid>
                {/* month */}
                <Grid item xs={4} >
                    <InputLabel>Month</InputLabel>
                    <Select fullWidth name="month" value={formik.values.dateOfBirth.month}
                        onChange={handleDateChange("month")}
                        onBlur={formik.handleBlur}
                    >
                        {months.map((month) => <MenuItem key={month.label} value={month.value} >{month.label}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={4}  >
                    <InputLabel>Year</InputLabel>
                    <Select fullWidth name="year" value={formik.values.dateOfBirth.year}
                        onChange={handleDateChange("year")}
                        onBlur={formik.handleBlur}
                    >
                        {years.map((year) => <MenuItem key={year} value={year} >{year}</MenuItem>)}
                    </Select>
                </Grid>
            </Grid>


            <Grid className='py-10' item xs={12} >
                <Button sx={{ borderRadius: "29px", py: "15px", bgcolor: "blue" }}
                    type="submit"
                    size='large'
                    fullWidth
                    variant='contained'
                >Sign Up</Button>
            </Grid>

        </form>
    )
}

export default SignUpForm