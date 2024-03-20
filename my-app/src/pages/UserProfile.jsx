import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserData } from "../Context/user";

const UserProfile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const { state, setState } = useUserData();
    const [formData, setFormData] = useState({
        name: state ? state.name : "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetch = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName || "",
                    };
                    setState(userData);
                } else {
                    setState(null);
                }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        });

        return () => fetch();
    }, [auth, setState]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await user.updateProfile({
                displayName: formData.name,
            });
            setState({ ...state, name: formData.name });
            setSuccessMessage("Profile updated successfully.");
            setError(null);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
            setSuccessMessage(null);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {error && <div>Error: {error}</div>}
            {successMessage && <div>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {state ? (
                <div>
                    <div>Email: {state.email}</div>
                    <div>UID: {state.uid}</div>
                    <div>Name: {state.name}</div>
                </div>
            ) : (
                <span>Sign in</span>
            )}
        </div>
    );
};

export default UserProfile;
