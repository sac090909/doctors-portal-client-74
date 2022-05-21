import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import { useQuery } from "react-query";

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const { data: bookings, isLoading } = useQuery(["myAppointments", user], () =>
    fetch(`http://localhost:4004/booking?patient=${user.email}`).then((res) =>
      res.json()
    )
  );

  console.log(bookings);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3>Dashboard - my appointment {bookings?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{b.patientName}</td>
                <td>{b.data}</td>
                <td>{b.slot}</td>
                <td>{b.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
