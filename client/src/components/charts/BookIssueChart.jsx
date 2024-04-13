import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from "recharts";
import { useAuth } from "../../context/Authetication";
import { getAllIssueBook } from "../../action/OperationsAction";

const BookIssueChart = () => {
    const { token } = useAuth();
    const [bookIssues, setBookIssues] = useState([]);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const response = await getAllIssueBook(token);
                if (response.success) {
                    const currentDate = new Date();
                    const lastSevenDays = new Date(currentDate);
                    lastSevenDays.setDate(currentDate.getDate() - 6);

                    // Initialize issue count for each date to 0
                    const issueCountByDate = {};
                    for (let i = 0; i < 7; i++) {
                        const date = new Date(lastSevenDays);
                        date.setDate(lastSevenDays.getDate() + i);
                        issueCountByDate[date.toISOString().split("T")[0]] = 0;
                    }

                    // Update issue count for dates where books were issued
                    response.data.forEach(issue => {
                        const dateOfIssue = issue.dateOfIssue;
                        if (dateOfIssue) {
                            const date = dateOfIssue.split("T")[0];
                            if (date in issueCountByDate) {
                                issueCountByDate[date]++;
                            }
                        }
                    });

                    // Prepare data for the chart, including dates with 0 counts
                    const chartData = [];
                    Object.keys(issueCountByDate).forEach(date => {
                        chartData.push({
                            dateOfIssue: date,
                            bookIssueCount: issueCountByDate[date]
                        });
                    });

                    setBookIssues(chartData);
                } else {
                    console.error('Error fetching book issues:', response.data);
                }
            } catch (error) {
                console.error('Something went wrong: ', error);
            }
        };

        fetchLibraryData();
    }, [token]);

    return (
        <div>
            <div className="text-xs bg-white p-6 rounded-md mb-2 mt-4">
                <h2 className="text-lg">Book Issue in last 7 days</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bookIssues}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateOfIssue" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="bookIssueCount" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookIssueChart;
