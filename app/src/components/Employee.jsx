import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db.json";
import "./Employee.css"; 
import LeaveTable from "./LeaveTable"; // Import LeaveTable component

const Employee = ({ setIsConnected }) => {
    const [employeeForm, setEmployeeForm] = useState({
        name: "",
        appointementDate: ""
    });
    const [id, setId] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [leaveForm, setLeaveForm] = useState({
        startDate: "",
        endDate: ""
    });
    const [leaveRequests, setLeaveRequests] = useState(db.leaveRequests);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = db.users; 
        if (Array.isArray(users)) {
            users.map((user) => {
                if (user.name === employeeForm.name) {
                    setReservations([...reservations, { name: employeeForm.name, appointementDate: employeeForm.appointementDate }]);
                    setId(user.id);
                }
            });
            const newRequest = {
                id: leaveRequests.length ? Math.max(...leaveRequests.map(req => req.id)) + 1 : 1,
                employeeId: id, 
                managerId: 1, 
                status: "pending",
                startDate: leaveForm.startDate,
                endDate: leaveForm.endDate
            };
            setLeaveRequests([...leaveRequests, newRequest]);
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
            <LeaveTable leaveRequests={leaveRequests} /> 
        </div>
    );
}

export default Employee;