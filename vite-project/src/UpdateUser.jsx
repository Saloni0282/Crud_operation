import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//edit

function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const user = users.find((u) => u.id === id);
    setName(user.name);
    setEmail(user.email);
    // setMobile(user.age);
      setMobile(user.mobile);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, { name, email, mobile })
      .then((res) => {
        dispatch(updateUser({ id, name, email, mobile }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Mobile</label>
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control"
              //   value={age}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
      
    </div>
  );
}

export default UpdateUser;
