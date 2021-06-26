import { useState } from "react";
import axios from "axios";
import Img from "../images/success.gif";

const PostForm = () => {
  const baseUrl = "http://localhost:5000/posts";

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmittted] = useState("");
  const [isLoading, setIsloading] = useState(false)

   const clear = () => {
       setData({name: "",email: "",phone: "",message: ""});
   }

  const handleSubmit = async(e) => {
      e.preventDefault();
      await axios.post(baseUrl, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
      })
      .then(res => {
          console.log(res.data)
          setIsloading(true)

          setTimeout(() => {
              setIsloading(false)
          },2000)
      })
      clear()
      setIsSubmittted( "Thank You. You have successfully sumitted the form.")
  };
     

  const handleChange = (e) => {
   const newData = {...data}
   newData[e.target.id] = e.target.value;
   setData(newData)
   console.log(newData)

  };

  return (
    <div style={{ marginTop: "60px" }}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholer="name"
          type="text"
          id="name"
          value={data.name}
        />
        <input
          onChange={handleChange}
          placeholer="email"
          type="email"
          id="email"
          value={data.email}
        />
        <input
          onChange={handleChange}
          placeholer="phone"
          type="text"
          id="phone"
          value={data.phone}
        />
        <input
          onChange={handleChange}
          placeholer="message"
          type="text"
          id="message"
          value={data.message}
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading && (
        <div style={{ marginTop: "25px" }}>
          <p style={{ color: "green" }}>{isSubmitted}</p>
          <img style={{height:"450px", width:"600px"}} src={Img} alt="submit" />
        </div>
      )}
    </div>
  );
};

export default PostForm;
