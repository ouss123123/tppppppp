import { useState } from "react";

const LeaveTable = ({ leaveRequests, onStatusChange }) => {

    const [isPostponed, setIsPostponed] = useState(false);

    const [formDates, setFormDates] = useState({
        newStartDate: "",
        newEndDate: ""
    });

    const handlePostpone = (id) => {
        const newStartDate = prompt("Enter new start date (YYYY-MM-DD):");
        const newEndDate = prompt("Enter new end date (YYYY-MM-DD):");
        setIsPostponed(true);
        if (newStartDate && newEndDate) {
            onStatusChange(id, "postponed", { newStartDate, newEndDate });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {leaveRequests && leaveRequests.map(request => (
                    <tr key={request.id} style={{ backgroundColor: request.status === "approved" ? "lightgreen" : "white" }}>
                        <td>{request.employeeId}</td>
                        <td>{request.startDate}</td>
                        <td>{request.endDate}</td>
                        <td>{request.status}</td>
                        <td>
                            <button onClick={() => onStatusChange(request.id, "approved")}>Approve</button>
                            <button onClick={() => onStatusChange(request.id, "rejected")}>Reject</button>
                            <button onClick={() => handlePostpone(request.id)}>Postpone</button>
                            {
                                isPostponed && (
                                    <>
                                        <input type="date" />
                                        <input type="date" />
                                    </>
                                )
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeaveTable;
