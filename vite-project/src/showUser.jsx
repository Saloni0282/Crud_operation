import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showUserById } from "./redux/userSlice";

function ShowUser() {
  const { id } = useParams();

  const user = useSelector((state) =>
    state.users.users.find((u) => u.id === id),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/read/` + id)
      .then((res) => {
        dispatch(showUserById(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch, id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
    </div>
  );
}

export default ShowUser;
