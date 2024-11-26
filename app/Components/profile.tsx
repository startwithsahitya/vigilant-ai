import React, { useState } from "react";

interface Profile {
  name: string;
  mailId: string;
  registrationNumber?: string;
  teacherCode?: string;
  profilePicture?: File | null;
}

const ProfileUI: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    mailId: "",
    registrationNumber: "",
    teacherCode: "",
    profilePicture: null,
  });

  // Determine if the profile is complete
  const isProfileComplete = () => {
    const { name, mailId, registrationNumber, teacherCode } = profile;
    return name && mailId && (registrationNumber || teacherCode);
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: file,
    }));
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Profile Status */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontWeight: "bold",
          color: isProfileComplete() ? "green" : "red",
        }}
      >
        {isProfileComplete() ? "Complete" : "Incomplete"}
      </div>

      {/* Profile Layout */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        {/* Profile Picture */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #ccc",
            background: "#f0f0f0",
            flexShrink: 0,
            textAlign: "center",
          }}
        >
          {profile.profilePicture ? (
            <img
              src={URL.createObjectURL(profile.profilePicture)}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ lineHeight: "100px", fontSize: "12px", color: "#aaa" }}>Upload</span>
          )}
        </div>

        {/* Profile Fields */}
        <div style={{ marginLeft: "20px", flexGrow: 1 }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>Name:</strong> {profile.name || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Mail ID:</strong> {profile.mailId || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>
              {profile.registrationNumber ? "Registration Number:" : "Teacher Code:"}
            </strong>{" "}
            {profile.registrationNumber || profile.teacherCode || "N/A"}
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Update Name:</strong>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              width: "100%",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Update Mail ID:</strong>
          <input
            type="email"
            value={profile.mailId}
            onChange={(e) => handleInputChange("mailId", e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              width: "100%",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Registration Number:</strong>
          <input
            type="text"
            value={profile.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              width: "100%",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Teacher Code:</strong>
          <input
            type="text"
            value={profile.teacherCode}
            onChange={(e) => handleInputChange("teacherCode", e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              width: "100%",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Upload Profile Picture:</strong>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "3px",
            width: "100%",
          }}
        />
      </div>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: isProfileComplete() ? "green" : "gray",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: isProfileComplete() ? "pointer" : "not-allowed",
        }}
        disabled={!isProfileComplete()}
      >
        Save Profile
      </button>
    </div>
  );
};

export default ProfileUI;
 