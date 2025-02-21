import { useState } from "react";

const LeaveTable = ({ leaveRequests, onStatusChange }) => {

    const [isPostponed, setIsPostponed] = useState(false);

    const [formDates, setFormDates] = useState({
        newStartDate: "",
        newEndDate: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onStatusChange(1, "Postpone", formDates);
        setIsPostponed(false);
    }

    const handlePostpone = (id) => {
        setIsPostponed(true);
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
                                    <div>
                                        <input type="date" onChange={(e) => setFormDates({...formDates,newStartDate : e.target.value})}/>
                                        <input type="date" onChange={(e) => setFormDates({...formDates,newEndDate : e.target.value})} />
                                        <button onClick={handleSubmit}>Submit</button>
                                    </div>
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
