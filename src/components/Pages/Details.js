import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

export default function Details() {
  const [personalData, setPersonalData] = useState({
    fullname: "",
    profileLink: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes",
          {
            method: "POST",  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }
        const data = await response.json();
        const user = data.users[0];
        console.log(user);
        setPersonalData({
          fullname: user.displayName || "",
          profileLink: user.photoUrl || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const profileHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: personalData.fullname,
            photoUrl: personalData.profileLink,
            returnSecureToken: false,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={profileHandler}>
      <h2>Contact Details</h2>
      <Form.Group className="mb-5" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullname"
          value={personalData.fullname}
          placeholder="Enter your full name"
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-5" controlId="formBasicLink">
        <Form.Label>LinkedIn Profile</Form.Label>
        <Form.Control
          type="url"
          name="profileLink"
          value={personalData.profileLink}
          placeholder="enter profile url"
          onChange={changeHandler}
        />
      </Form.Group>
      <Button type="submit">Update</Button>
    </Form>
  );
}
