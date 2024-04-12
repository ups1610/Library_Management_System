import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from "recharts";
import { useAuth } from "../../context/Authetication";
import { allReturnBooks, getAllIssueBook } from "../../action/OperationsAction";

const BookIssueChart = () => {
    const [bookReturns, setBookReturns] = useState([]);
    const [bookIssues, setBookIssues] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const bookReturnsData = await allReturnBooks(token);
                const bookIssuesData = await getAllIssueBook(token);
                setBookReturns(bookReturnsData.data);
                setBookIssues(bookIssuesData.data);
            } catch (error) {
                console.error("Error occurred while fetching library data:", error);
            }
        };

        fetchLibraryData();
    }, [token]);

    return (
        <div>
            <div className="chart-container">
                <h2>Book Return Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bookReturns}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateOfReturn" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="bookReturnId" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-container">
                <h2>Book Issue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bookIssues}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateOfIssue" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="bookIssueId" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookIssueChart;
