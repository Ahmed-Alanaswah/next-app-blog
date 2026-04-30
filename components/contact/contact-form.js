import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestStatus == "success" || requestStatus == "error") {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);
  async function sendContentData(contactDetails) {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: { "Content-Type": "application/json" },
    });

    const data = res.json();

    if (!res.ok) {
      throw new Error(data.message || "something went wrong");
    }
  }
  async function sendMessageHandler(e) {
    e.preventDefault();
    setRequestStatus("pending");

    try {
      await sendContentData({ email, name, message });
      setRequestStatus("success");
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;
  if (requestStatus == "pending") {
    notification = {
      status: "pending",
      title: "sending message....",
      message: "your message in way",
    };
  }
  if (requestStatus == "success") {
    notification = {
      status: "success",
      title: "message sent....",
      message: "your message sent",
    };
  }

  if (requestStatus == "error") {
    notification = {
      status: "error",
      title: "sending message failed....",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>how can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            rows="5"
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>send message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
