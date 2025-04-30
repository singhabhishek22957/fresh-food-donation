import React, { useEffect, useState } from "react";
import { userTesting } from "../../Service/UserService";

const UserTesting = () => {
  const [data, setData] = useState({
    name: "",
    intention: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userTesting();
        console.log("Response: ", response);
      } catch (error) {
        console.log("Error: ", error);
        
      }
    };

    fetchData();
  }, []);
  return <div>"UserTesting"</div>;
};

export default UserTesting;
