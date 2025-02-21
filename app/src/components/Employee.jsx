import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db.json";
import "./Employee.css"; // Import the CSS file

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

    const navigate = useNavigate();

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

    const logOut = () => {
        setIsConnected(false)
        navigate(`/`);
    }

    return (
        <div className="employee-container">
            <h1>Employee</h1>
            <div>
                <input type="date" onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} />
                <input type="date" onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} />
                <button onClick={handleSubmit} className="submit-button">Submit</button>
                <button onClick={logOut} className="logout-button">LogOut</button>
            </div>
        </div>
    );
}

export default Employee;