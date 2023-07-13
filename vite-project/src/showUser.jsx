import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showUserById } from "./redux/userSlice";

function ShowUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.users.users.find((u) => u.id === id, console.log(id)));
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/read/` + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch, id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-50 bg-white rounded p-3">
      <h2>User Details</h2>

      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>

      <button
        onClick={() => navigate("/")}
        className="btn btn-sm btn-success me-2"
      >
        BACK TO PAGE 1
      </button>
    </div>
  );
}

export default ShowUser;
