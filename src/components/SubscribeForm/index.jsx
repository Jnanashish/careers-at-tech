import React, { useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SubscribeForm = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
    const degrees = [
        { value: "", display: "Select a degree" },
        { value: "bachelors", display: "Bachelor's Degree" },
        { value: "masters", display: "Master's Degree" },
        { value: "phd", display: "Ph.D." },
        { value: "diploma", display: "Diploma" },
        { value: "certificate", display: "Certificate" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        graduationYear: "",
        degree: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        graduationYear: "",
        degree: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateName = (name) => {
        if (!name.trim()) return "Name is required";
        if (name.trim().length < 2) return "Name must be at least 2 characters";
        return "";
    };

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validateGraduationYear = (year) => {
        if (!year) return "Graduation year is required";
        return "";
    };

    const validateDegree = (degree) => {
        if (!degree) return "Degree is required";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the error when user types
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const graduationYearError = validateGraduationYear(formData.graduationYear);
        const degreeError = validateDegree(formData.degree);

        // Update errors state
        setErrors({
            name: nameError,
            email: emailError,
            graduationYear: graduationYearError,
            degree: degreeError,
        });

        // Check if there are any errors
        if (nameError || emailError || graduationYearError || degreeError) {
            return;
        }

        // Form is valid, proceed with submission
        console.log("Form submitted:", formData);
        
        // Show success message
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                graduationYear: "",
                degree: "",
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className={styles.subscribeForm}>
            <h2>Subscribe for Updates</h2>
            <p>Get the latest job opportunities and career advice delivered to your inbox.</p>
            
            {isSubmitted ? (
                <div className={styles.successMessage}>
                    <FontAwesomeIcon icon={faCheck} />
                    <p>Thank you for subscribing!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.formInput} ${errors.name ? styles.hasError : ""}`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.formInput} ${errors.email ? styles.hasError : ""}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Graduation Year</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.formInput} ${errors.email ? styles.hasError : ""}`}
                            placeholder="Enter your graduation year - 2022"
                        />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="degree">Degree</label>
                        <select
                            id="degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            className={`${styles.select} ${errors.degree ? styles.hasError : ""}`}
                        >
                            {degrees.map((degree) => (
                                <option key={degree.value} value={degree.value}>
                                    {degree.display}
                                </option>
                            ))}
                        </select>
                        {errors.degree && <div className={styles.error}>{errors.degree}</div>}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Subscribe
                    </button>
                </form>
            )}
        </div>
    );
};

export default SubscribeForm;
