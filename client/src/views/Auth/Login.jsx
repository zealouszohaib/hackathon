import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import Swal from 'sweetalert2';
import { setUser } from '../../utills/user';
import authImg from '../../assets/auth.png';

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(response.token);
        window.location.reload();
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
    <div className="container-fluid vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="row shadow rounded-4 overflow-hidden w-50" style={{ maxWidth: '900px' }}>
        {/* Illustration Section */}
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
          <h3 className="mb-4 text-center text-primary fw-bold">Welcome Back</h3>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-3 text-end">
              <Link to="/auth/forget" className="text-decoration-none text-danger">Forgot Password?</Link>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">OR</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Register Button */}
            <div className="d-grid">
              <Link to="/auth/register" className="btn btn-warning btn-lg text-white">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
