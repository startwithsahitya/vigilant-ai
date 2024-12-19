import React, { useState, useEffect } from "react";
import styles from "./StudentProfile.module.css";

interface Profile {
  name: string;
  mailId: string;
  registrationNumber?: string;
  profilePicture?: string;
}

const ProfileUI: React.FC<{ email: string }> = ({ email }) => {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    mailId: email, // Use inherited email directly
    registrationNumber: "",
    profilePicture: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    // Fetch profile details using the inherited email
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/getProfileS?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...data, // Merge fetched data with the existing profile
          }));
        } else {
          setMessage("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("An error occurred while fetching the profile.");
      }
    };

    fetchProfile();
  }, [email]);

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: file.name, // For display purposes
      }));
    }
  };

  const saveProfile = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("registrationNumber", profile.registrationNumber || "");
    formData.append("mailId", profile.mailId);

    const fileInput = document.querySelector<HTMLInputElement>(
      'input[type="file"]'
    );
    if (fileInput?.files?.[0]) {
      formData.append("profilePicture", fileInput.files[0]);
    }

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Profile updated successfully!");
        setIsEditable(false);

        // Refresh the profile data from the server
        const fetchUpdatedProfile = await fetch(
          `/api/getProfileS?email=${email}`
        );
        const updatedData = await fetchUpdatedProfile.json();
        setProfile((prevProfile) => ({
          ...prevProfile,
          ...updatedData,
        }));
      } else {
        setMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the profile.");
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const enableEditing = () => {
    setIsEditable(true);
  };

  const isProfileComplete =
    profile.name &&
    profile.registrationNumber &&
    profile.profilePicture &&
    profile.profilePicture !== "";

  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>

      <div className={styles.profileLayout}>
        <div className={styles.profilePictureContainer}>
          {profile.profilePicture ? (
            <img
              src={`/uploads/${profile.profilePicture}`}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.placeholder}>
              <span>Upload Picture</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.uploadInput}
            disabled={!isEditable}
          />
        </div>

        <div className={styles.profileFields}>
          <div className={styles.fieldGroup}>
            <label>
              <strong>Email:</strong>
            </label>
            <span>{profile.mailId}</span>
          </div>
          <div className={styles.fieldGroup}>
            <label>
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditable}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>
              <strong>Registration Number:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your registration number"
              value={profile.registrationNumber || ""}
              onChange={(e) =>
                handleInputChange("registrationNumber", e.target.value)
              }
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {!isEditable && (
          <button
            className={styles.editButton}
            onClick={enableEditing}
            disabled={isSaving}
          >
            Edit Profile
          </button>
        )}

        {isEditable && (
          <button
            className={`${styles.saveButton} ${
              isSaving ? styles.loading : ""
            }`}
            onClick={saveProfile}
            disabled={isSaving || !isProfileComplete}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        )}
      </div>

      {message && <p className={styles.message}>{message}</p>}
      {!isProfileComplete && (
        <p className={styles.incompleteMessage}>Profile is incomplete.</p>
      )}
    </div>
  );
};

export default ProfileUI;
