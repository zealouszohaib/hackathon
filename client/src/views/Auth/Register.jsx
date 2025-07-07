import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import authImg from '../../assets/auth.png';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(20, 'First name must be 20 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(20, 'Last name must be 20 characters or less')
      .required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Congratulations! Your account was created successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/auth/login');
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row shadow rounded-4 overflow-hidden w-80" style={{ maxWidth: '950px' }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-flex bg-primary p-0" style={{ alignItems: 'stretch', justifyContent: 'center' }}>
          <img
            src={authImg}
            alt="Login"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 bg-white p-5">
          <h3 className="mb-4 fw-bold text-primary text-center">Create Your Account</h3>
          <form onSubmit={formik.handleSubmit}>
            {/* First Name & Last Name */}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="invalid-feedback">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="col">
                <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="invalid-feedback">{formik.errors.lastName}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit & Switch to Login */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">Register</button>
            </div>

            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-grid">
              <Link to="/auth/login" className="btn btn-warning btn-lg text-white">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
