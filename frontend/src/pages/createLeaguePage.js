import React, { useState } from "react";
import LeagueForm from "../components/leagueForm/LeagueForm";

const CreateLeaguePage = () => {
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    hostSchool: "",
    season: "",
    logoUrl: "",
    signupStart: null,
    signupEnd: null,
    leagueStart: null,
    leagueEnd: null,
    maxTeams: 8,
    minTeams: 4,
    maxPlayersPerTeam: 18,
    minPlayersPerTeam: 5,
    matchFormat: "",
    gameDuration: 60,
    location: "",
    isPublic: true,
    requiresApproval: false,
    ruleAttachmentUrl: "",
    contactName: "", contactEmail: "", contactPhone: "",
    description: "",
    ageGroup: "",
    gender: "",
    equipmentRequired: [],
    awards: [],
    cancellationPolicy: ""
  });

  const EQUIPMENT_OPTIONS = [
    "Jersey",
    "Shorts",
    "Socks",
    "Shin Guards",
    "Cleats",
    "Gloves",
    "Base Layer",
    "Captain Armband",
    "Match Ball",
    "Alternative Jerseys/Bibs",
    "Printed Roster",
    "Medical Kit",
    "Team Flag"
  ];  

  const AWARD_OPTIONS = [
    "Champion",
    "Runner-up",
    "Third Place",
    "Most Valuable Player",
    "Top Scorer",
    "Best Goalkeeper",
    "Fair Play Award",
    "Best Organized Team",
    "Best Newcomer",
    "Most Promising Team",
    "Assist Leader",
    "Most Popular Player"
  ];
  

  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [additionalContacts, setAdditionalContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", role: "" });

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "League name is required";
    if (!form.hostSchool) newErrors.hostSchool = "Host school is required";
    if (!form.contactEmail) newErrors.contactEmail = "Contact email is required";
    if (form.signupStart && form.signupEnd && form.signupStart > form.signupEnd) {
      newErrors.signUpEnd = "Signup end must be after start";
    }
    if (form.leagueStart && form.leagueEnd && form.leagueStart > form.leagueEnd) {
      newErrors.leagueEnd = "League end must be after start";
    }
    if (form.maxTeams < form.minTeams) {
      newErrors.maxTeams = "Max teams must be greater than min teams";
    }
    if (form.maxPlayersPerTeam < form.minPlayersPerTeam) {
      newErrors.maxPlayersPerTeam = "Max players must be greater than min players";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (name === 'logo') {
      setLogoPreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, logo: file }));

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errorText}`);
        }

        const data = await res.json();
        const uploadedUrl = data?.url || "";

        setForm((prev) => ({
          ...prev,
          logoUrl: uploadedUrl,
        }));

        console.log("Uploaded Logo URL:", uploadedUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Fail to Upload Logo");
      }
    } else if (name === 'ruleAttachment') {
      setForm((prev) => ({ ...prev, ruleAttachment: file }));

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errorText}`);
        }

        const data = await res.json();
        const uploadedUrl = data?.url || "";

        setForm((prev) => ({
          ...prev,
          ruleAttachmentUrl: uploadedUrl,
        }));

        console.log("Uploaded Rules URL:", uploadedUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Fail to Upload Rule Document");
      }
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setAdditionalContacts([...additionalContacts, newContact]);
      setNewContact({ name: "", email: "", role: "" });
    }
  };

  const handleRemoveContact = (index) => {
    setAdditionalContacts(additionalContacts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const contacts = [
        {
          name: form.contactName || "Primary Contact",
          email: form.contactEmail,
          phone: form.contactPhone,
          role: "Organizer",
          isPrimary: true
        },
        ...additionalContacts.map((c) => ({
          ...c,
          isPrimary: false
        }))
      ];

      const payload = {
        ...form,
        ageGroup: form.ageGroup?.toUpperCase(),
        gender: form.gender?.toUpperCase(),
        matchFormat: form.matchFormat?.toUpperCase().replaceAll(" ", "_"),
        logo: form.logoUrl || "",
        ruleAttachment: form.ruleAttachmentUrl || "",
        contacts
      };

      const token = sessionStorage.getItem("authToken")
      const response = await fetch("http://localhost:8080/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${text}`);
      }

      const result = await response.json();
      alert("League created successfully!");
      console.log("Created league:", result);
      window.location.href = "/my-organization"; 
    } catch (error) {
      console.error("League creation error:", error);
      alert("Failed to create league. Please check console for details.");
    }
  };



  return (
      <LeagueForm
        form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        logoPreview={logoPreview}
        additionalContacts={additionalContacts}
        newContact={newContact}
        handleAddContact={handleAddContact}
        handleRemoveContact={handleRemoveContact}
        setNewContact={setNewContact}
        isEditMode={false}
      />
    );
  };



export default CreateLeaguePage;