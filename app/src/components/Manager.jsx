import { useState, useEffect } from "react";
import db from "../db.json";
import LeaveTable from "./LeaveTable";
import { useNavigate } from "react-router-dom";
import "./Manager.css"; // Import the CSS file

const Manager = ({ setIsConnected }) => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const managerId = 1;
        const requests = db.leaveRequests.filter(request => request.managerId === managerId);
        setLeaveRequests(requests);
    }, []);

    const handleStatusChange = (id, status, newDates = null) => {
        setLeaveRequests(prevRequests => 
            prevRequests.map(request => 
                request.id === id ? { 
                    ...request, 
                    status, 
                    startDate: newDates?.newStartDate || request.startDate, 
                    endDate: newDates?.newEndDate || request.endDate 
                } : request
            )
        );
    };

    const LogOut = () => {
        setIsConnected(false);
        navigate(`/`);
    }

    return (
        <div className="manager-container">
            <h1>Manager</h1>
            <LeaveTable leaveRequests={leaveRequests} onStatusChange={handleStatusChange} />
            <button onClick={LogOut} className="logout-button">LogOut</button>
        </div>
    );
}

export default Manager;