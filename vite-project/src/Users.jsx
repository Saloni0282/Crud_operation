import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUserById } from "./redux/userSlice";

function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteuser/" + id)
      .then((res) => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

//   const handleShow = (id) => {
//     axios
//       .get(`http://localhost:3001/read/` + id)
//       .then((res) => {
//         const user = res.data;
//         dispatch(showUserById(user));
//       })
//       .catch((err) => console.log(err));
//   };

  // useEffect(() => {

  // }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Mobile</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.mobile}</td> */}
                  <td>
                 
                  {/* onClick={() => handleShow(user.id)} */}
                    <Link to={`/read/${user.id}`} className="btn btn-sm btn-success me-2">
                      View
                    </Link>
                    <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
