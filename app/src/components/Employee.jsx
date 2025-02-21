import { useState } from "react";
import db from "../db.json";

const Employee = ({ setIsConnected }) => {
    const [employeeForm, setEmployeeForm] = useState({
        name: "",
        appointementDate: ""
    });
    const [reservations, setReservations] = useState([]);
    const [leaveForm, setLeaveForm] = useState({
        startDate: "",
        endDate: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = db.users; 
        if (Array.isArray(users)) {
            users.map((user) => {
                if (user.name === employeeForm.name) {
                    setReservations([...reservations, { name: employeeForm.name, appointementDate: employeeForm.appointementDate }]);
                }
            });
            const newRequest = {
                id: db.leaveRequests.length + 1,
                employeeId: 3, 
                managerId: 1, 
                status: "pending",
                startDate: leaveForm.startDate,
                endDate: leaveForm.endDate
            };
            db.leaveRequests.push(newRequest);
        } else {
            console.error("Users data is not an array");
        }
    };

    console.log(reservations);

    console.log(leaveForm);
    

    return (
        <div>
            <h1>Employee</h1>
            <div>
                <input type="text" placeholder="name" onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} />
                <input type="date" onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} />
                <input type="date" onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} />
                <button onClick={handleSubmit} style={{
                    width: "100px",
                    height: "30px",
                }}>Submit</button>
            </div>
        </div>
    );
}

export default Employee;