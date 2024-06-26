import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import BookingsTable from "../Components/Service/BookingsTable";
import Swal from "sweetalert2";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const URL = `https://car-doctor-server-seven-ochre.vercel.app/bookings?email=${user?.email}`
    useEffect(() => {

        axios.get(URL, { withCredentials: true })
            .then(res => { setBookings(res.data) })
        // fetch(URL)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setBookings(data)
        //     })
    }, [URL])

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://car-doctor-server-seven-ochre.vercel.app/bookings/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Service has been deleted.",
                                icon: "success"
                            });
                            const remaining = bookings.filter(booking => booking._id !== id)
                            setBookings(remaining)
                        }
                    })
            }
        });

    }
    const handleConfirm = id => {
        fetch(`https://car-doctor-server-seven-ochre.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.find(booking => booking._id === id)
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining]
                    setBookings(newBookings)
                }

            })
    }
    return (
        <div className="max-w-[1600px] mx-auto">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Services</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingsTable key={booking._id} booking={booking} handleDelete={handleDelete} handleConfirm={handleConfirm} />)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;