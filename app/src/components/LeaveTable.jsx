import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";
import db from "../db.json";
import "./LeaveTable.css"; 

const LeaveTable = ({ leaveRequests, onStatusChange }) => {
    const [isPostponed, setIsPostponed] = useState(false);
    const [formDates, setFormDates] = useState({
        newStartDate: "",
        newEndDate: ""
    });
    const [postponeId, setPostponeId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStatusChange(postponeId, "Postpone", formDates);
        setIsPostponed(false);
        setPostponeId(null);
    };

    const handlePostpone = (id) => {
        setIsPostponed(true);
        setPostponeId(id);
    };

    const currentMonth = new Date();
    const weeks = eachWeekOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const getEmployeeName = (employeeId) => {
        const employee = db.users.find(user => user.id === employeeId);
        return employee ? employee.name : "Unknown";
    };

    return (
        <table className="leave-table">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    {weeks.map((week, index) => (
                        <th key={index}>{format(week, "MMM dd")}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {leaveRequests.map(request => (
                    <tr key={request.id} className={request.status === "rejected" ? "rejected" : ""} style={{ backgroundColor: request.status === "approved" ? "lightgreen" : "white" }}>
                        <td>{request.employeeId}</td>
                        {weeks.map((week, index) => (
                            <td key={index} style={{ backgroundColor: request.startDate <= format(week, "yyyy-MM-dd") && request.endDate >= format(week, "yyyy-MM-dd") ? "lightblue" : "white" }}>
                                {request.startDate <= format(week, "yyyy-MM-dd") && request.endDate >= format(week, "yyyy-MM-dd") ? `${getEmployeeName(request.employeeId)} (${request.startDate} - ${request.endDate})` : ""}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => onStatusChange(request.id, "approved")}>Approve</button>
                            <button onClick={() => onStatusChange(request.id, "rejected")}>Reject</button>
                            <button onClick={() => handlePostpone(request.id)}>Postpone</button>
                            {isPostponed && postponeId === request.id && (
                                <div>
                                    <input type="date" onChange={(e) => setFormDates({ ...formDates, newStartDate: e.target.value })} />
                                    <input type="date" onChange={(e) => setFormDates({ ...formDates, newEndDate: e.target.value })} />
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeaveTable;
